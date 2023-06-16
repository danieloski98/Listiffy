import React from 'react'
import { View, Text } from '../../../components'
import { ImageBackground, Pressable, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native'
import { Colors } from 'react-native-ui-lib'
import { Feather } from '@expo/vector-icons';
import { useVerfificationState } from './state';
import { collection, query, where, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import { FireStoreDb } from '../../../firebase';
import { useDetails } from '../../../State/Details';
import { useAccountSetupState } from './BusinessInformation/state';
import { useDocState } from './Verification/state';
import { ScrollView } from 'react-native-gesture-handler';
import { useMutation, useQuery } from 'react-query';
import httpClient from '../../../utils/axios';
import handleToast from '../../../hooks/handleToast';

const VerificationTrackerTiles = ({ title, started,icon, onPress, completionRate, completed, type, step}: { title: string, started: boolean, icon: 'user'|'key', onPress: () => void, completionRate: number, completed: boolean, type: 'info'| 'doc', step?: number}) => {
    const { ShowToast} = handleToast();
    const handlePress = React.useCallback(() => {
        if (type === 'doc') {
            if (step !== 2) {
                ShowToast({ message: 'Finish your business information set up first', preset: 'general'})
                return;
            }
            onPress()
        } else {
            if (!started || !completed) {
                onPress();
            } else {
                return;
            }
        }
        
    }, [completed, step, type]);
    return (
        <Pressable onPress={handlePress} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
            <Feather name={icon} size={30} color="black" />
            <View flex={1} paddingHorizontal='l'>
                <Text variant='medium' style={{ fontSize: 17 }}>{title}</Text>
                {!completed && <Text variant='body' color={started ? 'brandColor':'black'} fontSize={15}>{started ? `Completed ${completionRate}%`:'Not started'}</Text>}
                {completed && <Text variant='body' color={'brandColor'} fontSize={15}>{`Completed 100%`}</Text>}
            </View>
            {type === 'doc' &&  !completed && <Feather name="chevron-right" size={25} color="black" />}
            {type === 'info' &&  !completed && <Feather name="chevron-right" size={25} color="black" />}
        </Pressable>
    )
}

const CreateBusinessProfile = ({ navigation }: { navigation: any }) => {
    const { ShowToast } = handleToast()
    const { step, completeionRate, setAll } = useVerfificationState((state) => state);
    const { setAll: setBusinessInformation, setStage } = useAccountSetupState((state) => state);
    const { setAll: setDocInformation, setStage: setDocStage } = useDocState((state) => state)
    const { id } = useDetails((state) => state)

    const createBusiness = useMutation({
        mutationFn: (data: any) => httpClient.post(`/business/create-account/${id}`, data)
    })

    const { isLoading, data, error } = useQuery(['getBusiness', id], () => httpClient.get(`/business/${id}`), {
        staleTime: 500,
        cacheTime: 500,
        refetchOnMount: true,
        onSuccess: (data) => {
            setStage(0);
            setDocStage(0);
            setAll({ step: data.data.data.step, completeionRate: data.data.data.completionRate });
        },
        onError: (error: any) => {
            ShowToast({ message: error, preset: 'failure' })
            createBusiness.mutate({ step: 1, completionRate: 0 });
        }
      });

    const handlePress = React.useCallback((route: 'businessinformation'|'verificatiton') => {
        if (createBusiness.isLoading || isLoading) {
            return;
        }
        navigation.navigate(route);
    }, [createBusiness.isLoading, isLoading]);

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
       <Text variant='header' fontSize={25} style={{ fontFamily: 'satoshi-bold'}} >Set up Business Profile</Text>
        <Text variant='body' marginTop='m'>Join +1000 vendors to drive more sales and more business exposure. As a vendor you will have access to Showcase Products & Services, Run Advertisements at low cost, Get Business reviews,
            Boost SEO ranking
        </Text>

        {!isLoading && (
            <View style={{ width: '100%', height: '50%', backgroundColor: '#F9F9F9', borderRadius: 20 }} marginTop='m'>
                <VerificationTrackerTiles onPress={() => handlePress('businessinformation')} title='Provide Business information' started={data?.data.data.step > 0 && data?.data.data.completionRate > 0} icon='user' completionRate={data?.data.data.completionRate} completed={data?.data.data.step > 1}type='info'  />

                <VerificationTrackerTiles onPress={() => handlePress('verificatiton')} title='Verfiy Identity' started={data?.data.data.step === 2 && data?.data.data.completionRate > 0} icon='key' completionRate={data?.data.data.completionRate} completed={data?.data.data.step == 2 && data?.data.data.completionRate === 100} type='doc' step={step} />
            </View>
        )}

        {isLoading && (
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