import React from 'react'
import { View, Text, CustomButton } from '../../../../../components'
import { ImageBackground, useWindowDimensions } from 'react-native'
import { Colors } from 'react-native-ui-lib'
import { Ionicons } from '@expo/vector-icons'
import { useDocState } from '../state'
import { useNavigation } from '@react-navigation/core'
import { setDoc, doc } from 'firebase/firestore'
import { FireStoreDb } from '../../../../../firebase'
import { useDetails } from '../../../../../State/Details'

const Pending = () => {
    const { width } = useWindowDimensions()
    const { setStage } = useDocState((state) => state);
    const { id } = useDetails((state) => state)
    const [loading, setLoading] = React.useState(false);
    const navigation = useNavigation<any>()

    const handleClick = React.useCallback(async() => {
      setLoading(true);
      await setDoc(doc(FireStoreDb, 'Verification', id), {
        step: 2,
        completionRate: 100,
      });
      setLoading(false);
      setStage(0);
      navigation.navigate('profile');
    }, []);

  return (
    <View flex={1}>
      <ImageBackground source={require('../../../../../../assets/images/meshbackground.png')} resizeMode='cover' style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: Colors.brandColor }}>

        <View width='100%' backgroundColor='white' borderRadius={20} padding='m' position={'relative'}>
            <View width='100%' height={100} justifyContent={'center'} alignItems={'center'} position={'absolute'} top={-50} left={ width/100 * 5 }>
                <View width={80} height={80} borderRadius={40} overflow={'hidden'} style={{ backgroundColor: '#E1FFEB', padding: 3}}>
                    <View width='100%' height='100%' borderRadius={40}  justifyContent='center' alignItems={'center'} backgroundColor='accentColor'>
                        <Ionicons name='time-outline' size={35} color='black'/>
                    </View>
                </View>
            </View>
            <View marginVertical='l'>
                <Text variant='subheader' textAlign='center'>Pending Verification</Text>
                <Text variant='body' textAlign='center'>your application is under review. This is may take 2 to 3 business days for us to review. In the mean time you can learn more about the safety guildlines and terms & conditions so as to keep our community safe.</Text>
            </View>
            
            <View height={30} />
            <CustomButton label='Done' onPress={handleClick} isLoading={loading} />
        </View>
      </ImageBackground>
    </View>
  )
}

export default Pending