import { ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View, Text } from '../../../components'
import { Feather } from '@expo/vector-icons'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import httpClient from '../../../utils/axios'
import { useQuery, useQueryClient } from 'react-query'
import { Colors } from 'react-native-ui-lib'
import { useDetails } from '../../../State/Details'
import { BookmarkModel } from '../../../models/Bookmark'
import PostCard from '../../../components/dashboardtabs/PostCard'
import { PostModel } from '../../../models/PostModel'

interface IProps {
    route: {
        params: {
            id: string,
        }
    },
    navigation: NativeStackScreenProps<any>
}

const Bookmarks = ({ route, navigation }: NativeStackScreenProps<any>) => {
    const { id } = useDetails((state) => state)
    const queryClient = useQueryClient();
    const { isLoading, data, isError } = useQuery(['getBookmarks', id], () => httpClient.get(`/post/bookmark/${id}`), {
    })
  return (
    <View flex={1} backgroundColor='white'>
        {/* HEADER */}
      <View flexDirection='row' height='20%' width='100%' alignItems='center' paddingHorizontal='m'>
            <Feather onPress={() => navigation.goBack()} name='chevron-left' size={30} color='black' />
            <View marginLeft='m'>
                <Text variant='subheader'>Bookmarks</Text>
                <Text variant='body'>View all your saved posts</Text>
            </View>
      </View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={async () => await queryClient.refetchQueries() } />}
      >
        {
            isLoading && (
                <View alignItems='center'>
                    <ActivityIndicator color={Colors.brandColor} />
                </View>
            )
        }
        {
            !isLoading && !isError && data?.data && data.data.data.length === 0 && (
                <View alignItems='center'>
                   <Text variant='medium'>No Bookmarks stored</Text>
                </View>
            )
        }
        {
            !isLoading && !isError && data?.data && data.data.data.length > 0 && (data?.data.data as BookmarkModel[]).map((item, index) => {
                return (
                    <PostCard key={index} data={item.post as PostModel} />
                )
            })
        }
      </ScrollView>
    </View>
  )
}

export default Bookmarks