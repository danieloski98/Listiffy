import React from 'react'
import { Image } from 'react-native'
import ProfileDetails from '../ProfileDetails'
import { View, Text } from '../..'
import { useDetails } from '../../../State/Details'
import { useQuery } from 'react-query'
import httpClient from '../../../utils/axios'
import { ActivityIndicator, useWindowDimensions } from 'react-native'
import { Colors } from 'react-native-ui-lib'
import ReviewCard from './ReviewCard'
import { ScrollView } from 'react-native-gesture-handler'
import { ReviewModel } from '../../../models/ReviewModel'

const BasicProfile = () => {
    const { id } = useDetails((state) => state);
    const { isLoading, data, error } = useQuery(['getUser', id], () => httpClient.get(`/user/${id}`));
    const { isLoading: reviewLoading, data: reviewData } = useQuery(['getReviews', id], () => httpClient.get(`/review/${id}`));
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
                {reviewLoading && (
                    <ActivityIndicator color={Colors.brandColor} size='large' />
                )}
                {
                    !reviewLoading && (reviewData?.data.data as Array<ReviewModel>).length === 0 && (
                        <View flex={1} alignItems='center'>
                            <Image source={require('../../../../assets/images/empty.png')} resizeMode='contain' style={{ width: 200, height: 200 }} />
                            <Text variant='body'>No reviews yet</Text>
                        </View>
                    )
                }
                {!reviewLoading && (reviewData?.data.data as Array<ReviewModel>).length > 0 && (reviewData?.data.data as Array<ReviewModel>).map((review, index) => (
                    <ReviewCard {...review} key={index} />
                ))}
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