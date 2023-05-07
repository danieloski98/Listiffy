import React from 'react'
import ProfileDetails from '../ProfileDetails'
import { View, Text } from '../..'
import { useDetails } from '../../../State/Details'
import { useQuery } from 'react-query'
import httpClient from '../../../utils/axios'
import { ActivityIndicator, useWindowDimensions } from 'react-native'
import { Colors } from 'react-native-ui-lib'
import ReviewCard from './ReviewCard'
import { ScrollView } from 'react-native-gesture-handler'

const BasicProfile = () => {
    const { id } = useDetails((state) => state);
    const { isLoading, data, error } = useQuery(['getUser', id], () => httpClient.get(`/user/${id}`));
    const { height } = useWindowDimensions()

    return (
        <View>
           {!isLoading && !error && (
             <>
                <ProfileDetails {...data!.data.data} />

                <View marginTop='l' marginHorizontal='m' paddingBottom='m' style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                    <Text variant='body'>Your Reviews</Text>
                </View>

               <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, }}>
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
               </ScrollView>

                {/* <View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center' }}>
                    <ReviewCard />
                </View> */}
            </>
           )}
           {isLoading && (
            <View justifyContent='center' alignItems='center'>
               <ActivityIndicator color={Colors.brandColor} size='large' />
               <Text variant='body'>Loading Details</Text>
            </View>
           )}
           {!isLoading && error as any && (
            <View justifyContent='center' alignItems='center'>
                <Text variant='body'>An Error Occured</Text>
            </View>
           )}
        </View>
    )
}

export default BasicProfile