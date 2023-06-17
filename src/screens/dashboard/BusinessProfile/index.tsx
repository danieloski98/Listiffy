import React from 'react'
// import ProfileDetails from '../ProfileDetails'
import { useDetails } from '../../../State/Details'
import { useQuery } from 'react-query'
import httpClient from '../../../utils/axios'
import { ActivityIndicator, Pressable, useWindowDimensions } from 'react-native'
import { Colors } from 'react-native-ui-lib'
import { ScrollView } from 'react-native-gesture-handler'
import { View, Text } from '../../../components'
import BusinessProfileDetails from '../../../components/dashboardtabs/BusinessProfileDetails'
import Posts from '../../../components/dashboardtabs/Profile/BusinessProfilePages/Posts'
import About from '../../../components/dashboardtabs/Profile/BusinessProfilePages/About'
import Reviews from '../../../components/dashboardtabs/Profile/BusinessProfilePages/Reviews'
import { Feather } from '@expo/vector-icons';


const ViewBusinessProfile = ({ route, navigation }: any) => {
    const { params: { id }} = route
    const [index, setIndex] = React.useState(1)
    const { isLoading, data, error } = useQuery(['getBusiness', id], () => httpClient.get(`/business/${id}`), {
        onSuccess: (data) => {
            console.log(data.data.data.reviews[0])
        }
    });
    // const { isLoading: Postloading } = useQuery(['getPosts', id], () => httpClient.get(`/post/user/${id}`));
    const { height } = useWindowDimensions()

    return (
        <View backgroundColor='white' flex={1}>
         <View style={{ height: '12%'}} flexDirection='row' paddingHorizontal='m' alignItems='flex-end' paddingBottom='l'>
            <Feather onPress={() => navigation.goBack()} name='chevron-left' size={25} color='grey' style={{ marginTop: 10 }} />
            <Text variant='body'>Business Profile</Text>
         </View>
           {!isLoading && !error && (
             <ScrollView contentContainerStyle={{ paddingBottom: 40  }}>
                <BusinessProfileDetails {...data!.data.data} isView />

                <View flexDirection='row' height={40} marginTop='l' marginHorizontal='m' style={{ borderBottomWidth: 1, borderBottomColor: 'whitesmoke' }}>

                    <Pressable onPress={() => setIndex(1)} style={{ borderBottomWidth: index === 1 ? 1:0, borderBottomColor: Colors.brandColor, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text variant='body' style={{ color: index ===1 ? Colors.brandColor: '#5E5E5E', fontSize: 16}}>Posts</Text>
                    </Pressable>

                    <Pressable onPress={() => setIndex(2)} style={{ borderBottomWidth: index === 2 ? 1:0, borderBottomColor: Colors.brandColor, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text variant='body' style={{ color: index ===2 ? Colors.brandColor: '#5E5E5E', fontSize: 16}}>About</Text>
                    </Pressable>

                    <Pressable onPress={() => setIndex(3)} style={{ borderBottomWidth: index === 3 ? 1:0, borderBottomColor: Colors.brandColor, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text variant='body' style={{ color: index ===3 ? Colors.brandColor: '#5E5E5E', fontSize: 16}}>Reviews</Text>
                    </Pressable>

                </View>

               <View padding='m'>
                { index === 1 && <Posts posts={data?.data.data.posts} /> }
                { index === 2 && <About {...data?.data.data} /> }
                { index === 3 && <Reviews reviews={data?.data.data.reviews} /> }
               </View>

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

export default ViewBusinessProfile