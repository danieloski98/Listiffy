import React from 'react'
import { View, Text } from '../../../components'
import { ImageBackground, Pressable, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { Colors } from 'react-native-ui-lib'
import { Feather } from '@expo/vector-icons';
import { useVerfificationState } from './state';
import { collection, query, where, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import { FireStoreDb } from '../../../firebase';
import { useDetails } from '../../../State/Details';
import { useAccountSetupState } from './BusinessInformation/state';
import { useDocState } from './Verification/state';
import { ScrollView } from 'react-native-gesture-handler';

const VerificationTrackerTiles = ({ title, started,icon, onPress, completionRate, completed, type}: { title: string, started: boolean, icon: 'user'|'key', onPress: () => void, completionRate: number, completed: boolean, type: 'info'| 'doc'}) => (
    <Pressable onPress={!completed ? onPress: null} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
        <Feather name={icon} size={30} color="black" />
        <View flex={1} paddingHorizontal='l'>
            <Text variant='subheader' style={{ fontSize: 17 }}>{title}</Text>
            {!completed && <Text variant='body' color={started ? 'brandColor':'black'} fontSize={15}>{started ? `Completed ${completionRate}%`:'Not started'}</Text>}
            {completed && <Text variant='body' color={'brandColor'} fontSize={15}>{`Completed 100%`}</Text>}
        </View>
        {type === 'doc' &&  !completed && <Feather name="chevron-right" size={25} color="black" />}
    </Pressable>
)

const CreateBusinessProfile = ({ navigation }: { navigation: any }) => {
    const { step, completeionRate, setAll } = useVerfificationState((state) => state);
    const { setAll: setBusinessInformation } = useAccountSetupState((state) => state);
    const { setAll: setDocInformation } = useDocState((state) => state)
    const { id } = useDetails((state) => state)
    const [loading, setLoading] = React.useState(false);
    const docRef = doc(FireStoreDb, 'Verification', id)

    React.useEffect(() => {
       (async function() {
        setLoading(true);
        const docSnapShot = await getDoc(docRef);
        if(docSnapShot.exists()) {
            setAll({ step: docSnapShot.data().step, completeionRate: docSnapShot.data().completionRate });
            setBusinessInformation({ ...docSnapShot.data().businessInformation });
            setDocInformation({ ...docSnapShot.data().verificationDocument })
            setLoading(false);
        } else {
            await setDoc(doc(FireStoreDb, 'Verification', id), {
                userId: id,
                step: 0,
                completionRate: 0,
                businessInformation: {
                },
                verificationDocument: {}
              });
              setLoading(false);
        }
       })()
    }, [])
    const handlePress = React.useCallback((route: 'businessinformation'|'verificatiton') => {
        navigation.navigate(route);
    }, []);
  return (
    <View flex={1} backgroundColor='white'>
     <View style={{ height: '40%', width: '100%' }}>
        <ImageBackground source={require('../../../../assets/images/meshbackground.png')} resizeMode='cover' style={[StyleSheet.absoluteFillObject, { height: '100%', width: '100%', backgroundColor: Colors.brandColor}]}>
            <View style={{ height: '20%',}} paddingHorizontal='m' justifyContent='flex-end'>
                <Feather name="chevron-left" size={30} color='white' onPress={() => navigation.goBack()} />
            </View>
            <View flex={1} paddingTop='m'>
                <Image source={require('../../../../assets/images/createbusiness.png')} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
            </View>
        </ImageBackground>
     </View>
    <View style={{ height: '60%', width: '100%', flex: 1 }} padding='m'>
       <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
       <Text variant='header' fontSize={25} >Set up Business Profile</Text>
        <Text variant='body' marginTop='m'>Join +1000 vendors to drive more sales and more business exposure. As a vendor you will have access to Showcase Products & Services, Run Advertisements at low cost, Get Business reviews,
            Boost SEO ranking
        </Text>

        {!loading && (
            <View style={{ width: '100%', height: '50%', backgroundColor: '#F9F9F9', borderRadius: 20 }} marginTop='m'>
            <VerificationTrackerTiles onPress={() => handlePress('businessinformation')} title='Provide Business information' started={step > 0 && completeionRate > 0} icon='user' completionRate={completeionRate} completed={step > 1}type='info'  />
            <VerificationTrackerTiles onPress={() => handlePress('verificatiton')} title='Verfiy Identity' started={step === 2 && completeionRate > 0} icon='key' completionRate={completeionRate} completed={step == 2 && completeionRate === 100} type='doc' />
        </View>
        )}

        {loading && (
            <View style={{ width: '100%', height: '50%', backgroundColor: '#F9F9F9', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} marginTop='m'>
                <ActivityIndicator color={Colors.brandColor} size={30} />
            </View>
        )}
       </ScrollView>
    </View>
    </View>
  )
}

export default CreateBusinessProfile