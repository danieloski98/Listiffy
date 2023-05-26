import React from 'react'
import ProfileDetails from '../ProfileDetails'
import { View, Text } from '../..'
import { useDetails } from '../../../State/Details'
import { useQuery } from 'react-query'
import httpClient from '../../../utils/axios'
import { ActivityIndicator, Pressable, useWindowDimensions } from 'react-native'
import { Colors } from 'react-native-ui-lib'
import ReviewCard from './ReviewCard'
import { ScrollView } from 'react-native-gesture-handler'
import BusinessProfileDetails from '../BusinessProfileDetails'
import Posts from './BusinessProfilePages/Posts'
import About from './BusinessProfilePages/About'
import Reviews from './BusinessProfilePages/Reviews'


const BusinessProfile = () => {
    const [index, setIndex] = React.useState(1)
    const { id } = useDetails((state) => state);
    const { isLoading, data, error } = useQuery(['getBusiness', id], () => httpClient.get(`/business/${id}`));
    const { height } = useWindowDimensions()

    return (
        <View>
           {!isLoading && !error && (
             <ScrollView contentContainerStyle={{  }}>
                <BusinessProfileDetails {...data!.data.data} />

                <View flexDirection='row' height={40} marginTop='l' marginHorizontal='m' style={{ borderBottomWidth: 1, borderBottomColor: 'whitesmoke' }}>

                    <Pressable onPress={() => setIndex(1)} style={{ borderBottomWidth: index === 1 ? 1:0, borderBottomColor: Colors.brandColor, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text variant='body'>Posts</Text>
                    </Pressable>

                    <Pressable onPress={() => setIndex(2)} style={{ borderBottomWidth: index === 2 ? 1:0, borderBottomColor: Colors.brandColor, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text variant='body'>About</Text>
                    </Pressable>

                    <Pressable onPress={() => setIndex(3)} style={{ borderBottomWidth: index === 3 ? 1:0, borderBottomColor: Colors.brandColor, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text variant='body'>Reviews</Text>
                    </Pressable>

                </View>

               <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, }}>
                { index === 1 && <Posts posts={[]} /> }
                { index === 2 && <About {...data?.data.data} /> }
                { index === 3 && <Reviews reviews={data?.data.data.reviews} /> }
               </ScrollView>

            </ScrollView>
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

export default BusinessProfile