import { ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { View, Text } from '../../../components'
import { Feather } from '@expo/vector-icons'
import handleToast from '../../../hooks/handleToast'
import { LikeModel } from '../../../models/LikeModel'
import { useQuery, useQueryClient } from 'react-query'
import httpClient from '../../../utils/axios'
import { CommentModel } from '../../../models/CommentModel'
import { Colors } from 'react-native-ui-lib'
import { FlatList, GestureHandlerRootView, RefreshControl } from 'react-native-gesture-handler'
import CommentCard from '../Comments/CommentCard'
import LikeCard from './LikeCard'
import CommentModal from '../../../components/dashboardtabs/Feeds/Modals/Comment'
import { useFeedsState } from '../../Dashboardtabs/feeds/state'

const Likes = ({ route, navigation }: any) => {
    const { params: { postId } } =route;
    const { ShowToast } = handleToast();
    const queryClient = useQueryClient();
    const { setAll } = useFeedsState((state) => state)
    const [likes, setLikes] = React.useState<Array<LikeModel>>([]);
    const [comments, setComments] = React.useState<Array<CommentModel>>([]);
    const [showModal, setShowModal] = React.useState(false);

    const { isLoading, refetch } = useQuery(['getPostt', postId], () => httpClient.get(`/post/${postId}`), {
        onSuccess: (data) => {
            console.log(data.data.data);
            setLikes(data.data.data.likes);
            setComments(data.data.data.comments as Array<CommentModel>);
        },
        onError: (error: any) => {
            ShowToast({ message: error, preset: 'failure' });
        }
    });

    const handleRefetch = React.useCallback(() => {
        refetch();
        queryClient.invalidateQueries();
        queryClient.refetchQueries();
      }, []);
  return (
    <GestureHandlerRootView style={styles.parent}>
        {/* HEADER */}
        <View style={styles.header}>
            <View flexDirection='row' alignItems='center'>
                <Feather name="chevron-left" size={30} color="grey" onPress={() => navigation.goBack()} />
                <Text variant='body'>{likes.length} Like(s)</Text>
            </View>

            <View flexDirection='row' alignItems='center'>
                <Feather onPress={() => {setAll({ activePostId: postId }); setShowModal(true)}} name="message-square" size={20} color="grey" />
                <Text variant='body' marginLeft='s'>{comments.length}</Text>
            </View>
        </View>

        {/* MAIN CONTENT AREA */}
        <View style={styles.mainarea}>
            {isLoading && (
                <View alignItems='center' marginTop='m'>
                    <ActivityIndicator size='large' color={Colors.brandColor} />
                </View>
            )}
            {!isLoading && likes.length > 0 && 
            <FlatList 
                style={{ paddingHorizontal: 20 }}
                data={likes}
                key={'likelist'}
                keyExtractor={({id}) => id}
                renderItem={({ item }) => (
                    <LikeCard {...item} />
                )}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefetch} title='Loading Likes' titleColor={Colors.brandColor} tintColor={Colors.brandColor} colors={[Colors.brandColor]} />}
            />}
            {!isLoading && likes.length === 0 && (
                <View alignItems='center' marginTop='m'>
                    <Text variant='body' textAlign={'center'}>No Likes</Text>
                </View>
            )}
        </View>

        {showModal && <CommentModal onClose={() => setShowModal(false)} />}
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        width: '100%',
        height: '12%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    mainarea: {
        flex: 1,
    },
    footer: {
        width: '100%',
        height: '15%',
        backgroundColor: '#F9F9F9',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    textInput: {
        width: '100%',
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#DFE1E8',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 10
    }
})

export default Likes