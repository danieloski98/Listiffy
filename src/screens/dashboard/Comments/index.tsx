import { ActivityIndicator, StyleSheet, TextInput, Image } from 'react-native'
import React from 'react'
import { View, Text } from '../../../components'
import { Feather } from '@expo/vector-icons'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import httpClient from '../../../utils/axios'
import handleToast from '../../../hooks/handleToast'
import { CommentModel } from '../../../models/CommentModel'
import { Colors } from 'react-native-ui-lib'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import { useDetails } from '../../../State/Details'
import CommentCard from './CommentCard'

const Comments = ({ route, navigation }: any) => {
    const { params: { postId } } =route;
    const { ShowToast } = handleToast();
    const [comment, setComment] = React.useState('');
    const { isCompany, profilePicture, username, id } = useDetails((state) => state)
    const [comments, setComments] = React.useState<Array<CommentModel>>([]);
    const [likes, setLikes] = React.useState(0);
    const queryClient = useQueryClient();

    React.useEffect(() => {
        if (postId === undefined) {
            ShowToast({ message: 'invalid post', preset: 'failure' });
            navigation.goBack();
        }
    }, [postId])

    const { isLoading, data, refetch } = useQuery(['getPost', postId], () => httpClient.get(`/post/${postId}`), {
        onSuccess: (data) => {
            setLikes(data.data.data.likes.length);
            setComments(data.data.data.comments as Array<CommentModel>);
        },
        onError: (error: any) => {
            ShowToast({ message: error, preset: 'failure' });
        }
    });

    const { isLoading: commentLoading, mutate } = useMutation({
        mutationFn: (data: any) => httpClient.put(`/post/comment/${id}`, data),
        onError: (error: any) => {
            ShowToast({ message: error, preset: 'failure' });
        },
        onSuccess: (data) => {
            setComment('');
            ShowToast({ message: data.data.message, preset: 'success' });
            queryClient.invalidateQueries('getPost');
            queryClient.refetchQueries();
        }
    });

    const handleSubmit = React.useCallback(() => {
        if (comment.length < 1) {
            ShowToast({ message: 'You have to type a message', preset: 'failure' });
            return;
        }
        const dataload = { comment, postId: postId }
        mutate(dataload);
    }, [comment, postId]);

    const handleRefetch = React.useCallback(() => {
        refetch();
        queryClient.invalidateQueries();
        queryClient.refetchQueries();
      }, []);
  return (
    <View style={styles.parent}>
        {/* HEADER */}
        <View style={styles.header}>
            <View flexDirection='row' alignItems='center'>
                <Feather name="chevron-left" size={30} color="grey" onPress={() => navigation.goBack()} />
                <Text variant='body'>Comments</Text>
            </View>

            <View flexDirection='row' alignItems='center' flex={0.4} justifyContent='space-evenly'>
                <Feather name="heart" size={20} color="grey" onPress={() => navigation.navigate('likes', { postId })} />
                <Text variant='body' onPress={() => navigation.navigate('likes', { postId })}>{likes}</Text>
                <Text variant='body' onPress={() => navigation.navigate('likes', { postId })}>{likes > 1 ? 'Likes':'Like'}</Text>
            </View>
        </View>

        {/* MAIN CONTENT AREA */}
        <View style={styles.mainarea}>
            {isLoading && (
                <View alignItems='center' marginTop='m'>
                    <ActivityIndicator size='large' color={Colors.brandColor} />
                </View>
            )}
            {!isLoading && comments.length > 0 && 
            <FlatList 
                style={{ paddingHorizontal: 20 }}
                data={comments}
                key={'commentslist'}
                keyExtractor={({id}) => id}
                renderItem={({ item }) => (
                    <CommentCard {...item} />
                )}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefetch} title='Loading Posts' titleColor={Colors.brandColor} tintColor={Colors.brandColor} colors={[Colors.brandColor]} />}
            />}
            {!isLoading && comments.length === 0 && (
                <View alignItems='center' marginTop='m'>
                    <Text variant='body' textAlign={'center'}>No Comments</Text>
                </View>
            )}
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
            <View style={styles.textInput}>
                <Image source={{ uri: profilePicture }} resizeMode='cover' style={{ width: 35, height: 35, borderRadius: 10 }} />
                <TextInput value={comment} keyboardType='twitter' keyboardAppearance='light' onSubmitEditing={handleSubmit} onChangeText={(e) => setComment(e)} style={{ flex: 1, marginLeft: 10 }} placeholder={`Comment as ${username}`} />
                {commentLoading && (
                    <ActivityIndicator size='small' color={Colors.brandColor} />
                )}
            </View>
        </View>
    </View>
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

export default Comments