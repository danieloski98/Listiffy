import { ActivityIndicator, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from 'react-native-ui-lib'
import { View, Text } from '../../'
import { Feather } from '@expo/vector-icons'
import { useQuery } from 'react-query'
import httpClient from '../../../utils/axios'
import { useDetails } from '../../../State/Details'
import handleToast from '../../../hooks/handleToast'
import { useNavigation } from '@react-navigation/native'

const BusinessProfileSetupTracker = () => {
    const { id } = useDetails((state) => state);
    const [stage, setStage] = React.useState<number>(0);
    const [completionRate, setCompletionRate] = React.useState(0);
    const [show, setShow] = React.useState(false);
    const { ShowToast } = handleToast();

    const navigation = useNavigation<any>()

    const { isLoading, data, error } = useQuery(['getBusiness', id], () => httpClient.get(`/business/${id}`), {
        refetchOnMount: true,
        onSuccess: (data) => {
            setStage(data.data.data.step);
            setCompletionRate(data.data.data.completionRate);
        },
        onError: (error: any) => {
            ShowToast({ message: error, preset: 'failure' })
            setStage(0);
        }
      });
    if (stage === 2 && completionRate === 100 ) {
        return null;
    }
  return (
    <Pressable style={Style.parent} onPress={() => navigation.navigate('createbusinessprofile')}>
        {!isLoading && (
            <>
                <View style={Style.count}>
                    <Text variant='subheader' color='white'>{stage}/2</Text>
                </View>
                <View>
                    <Text variant='subheader' color='white'>Set up Business Profile</Text>
                    <Text variant="body" color='white'>Continues from where you left of</Text>
                </View>

                <Feather name='chevron-right' size={30} color='white' />
            </>
        )}
        {
            isLoading && (
                <ActivityIndicator color={Colors.brandColor} size='large' />
            )
        }
    </Pressable>
  )
}

const Style = StyleSheet.create({
    parent: {
        height: 99,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: '#222222',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    count: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.brandColor,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default BusinessProfileSetupTracker