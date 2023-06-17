import { StyleSheet, Image, useWindowDimensions, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { View, Text } from '..'
import { Feather, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'react-native-ui-lib';
import PagerView from 'react-native-pager-view';
import { PostModel } from '../../models/PostModel';
import TimeAgo from 'react-native-timeago';
import { useDetails } from '../../State/Details';
import { useMutation, useQueryClient } from 'react-query';
import httpClient from '../../utils/axios';
import handleToast from '../../hooks/handleToast';
import { useFeedsState } from '../../screens/Dashboardtabs/feeds/state';
import { useNavigation } from '@react-navigation/native';


interface IProps {
    data: PostModel
}

const PostCard: React.FC<IProps> = ({ data }) => {
    const { bookmarks, setAll } = useFeedsState((state) => state)
    const { user: { business_name, logo, id: businessId }, likes, comments, description, images, createdAt, id } = data;
    const { height } = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const { id: userId } = useDetails((state) => state);
    const { ShowToast } = handleToast();
    const queryClient = useQueryClient();
    const navigation = useNavigation<any>();

    const { isLoading, mutate } = useMutation({
        mutationFn: () => httpClient.put(`/post/like/${userId}/${id}`),
        onError: (error: any) => {
            ShowToast({ message: error, preset: 'failure' });
        },
        onSuccess: (data) => {
            ShowToast({ message: data.data.message, preset: 'success' });
            queryClient.invalidateQueries('getPosts');
            queryClient.refetchQueries();
        }
    });

    const { isLoading: bookmarkLoading, mutate: createBookmark } = useMutation({
        mutationFn: () => httpClient.post(`/post/bookmark/create`, { postId: id, userId }),
        onError: (error: any) => {
            ShowToast({ message: error, preset: 'failure' });
        },
        onSuccess: (data) => {
            ShowToast({ message: data.data.message, preset: 'success' });
            // queryClient.invalidateQueries('getPosts');
            queryClient.refetchQueries();
        }
    });

    const handleBookmark = React.useCallback(() => {
        if (bookmarks.includes(id)) {
            setAll({ bookmarks: bookmarks.filter((item) => item !== id) });
            createBookmark();
        } else {
            setAll({ bookmarks: [...bookmarks, id] });
            createBookmark();
        }
    }, [bookmarks])

    // states
    const [showMore, setShowMore] = React.useState(false);
  return (
    <View style={Styles.parent}>
        {/* HEADER */}
        <View style={Styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <LinearGradient
                    colors={[Colors.brandColor, Colors.accentColor]}
                    style={{ width: 54, height: 54, borderRadius: 18, overflow: 'hidden', padding: 2 }}
                >
                    <View style={{ width: '100%', height: '100%', borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', overflow: 'hidden' }} >
                        <Image source={{ uri: logo }} resizeMode='cover' style={{ width: '100%', height: '100%'}} />
                    </View>
                </LinearGradient>
                <View style={{ paddingLeft: 10}}>
                    <Text onPress={() => navigation.navigate('view-profile', { id: businessId })} variant='medium'>{business_name}<Text variant='body'>@{business_name}</Text></Text>
                    <Text variant='xs'>
                        <TimeAgo time={createdAt} interval={20000} />
                    </Text>
                </View>
            </View>

            {/* ICON BOX */}
            <View>
                <Feather name="more-horizontal" size={25} color="black" />
            </View>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
            <Text variant='body' marginVertical='m' textAlign='justify' ellipsizeMode='tail' numberOfLines={showMore ? undefined : 1} >
                {description}
            </Text>
            {description.length > 30 && 
            <Text variant='xs' color='brandColor' style={{ marginLeft: 0}} onPress={() => setShowMore(prev => !prev)}>
                {showMore ? 'Show Less' : 'More'}
            </Text>}
        </View>
        

        {/* IMAGE BOX */}
        <View marginVertical='m' style={{ flex: 1, backgroundColor: 'black', borderRadius: 20, overflow: 'hidden', width: '100%', height:  height / 100 * 60 }}>
            <PagerView style={{ flex: 1 }} initialPage={0} onPageScroll={(e) => setIndex(e.nativeEvent.position)}>
                {images.map((Item, indx) => (
                     <Image key={indx} source={{ uri: Item }}  style={[StyleSheet.absoluteFillObject, { width: '100%', height: '100%'}]} />
                ))}
            </PagerView>

            <View style={{ width: '100%', height: 40, backgroundColor: 'transparent', position: 'absolute', bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {images.length > 1 && images.map((item, inx) => (
                    <View key={inx} style={{ width: 5, height: 5, borderRadius: 5, backgroundColor: inx === index ? Colors.white:'lightgrey', transform: [
                        { scale: inx === index ? 1.5: 1}
                    ] }} marginRight='s' />
                ))}
            </View>
        </View>

        {/* ACTIVITY BOX */}
        <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-between'}}>

            <View style={{ flexDirection: 'row' }}>
               <Pressable style={{ flexDirection: 'row' }} onPress={() => mutate()} >
                    {
                        isLoading && (
                            <ActivityIndicator size='small' color={Colors.brandColor} />
                        )
                    }
                    {
                        !isLoading && (
                            <>
                                <Feather name='heart' size={20} color='#222222'  />
                                <Text variant='body' style={{ color: '#222222', marginLeft: 4 }}>{likes.length || 0}</Text>
                            </>
                        )
                    }
               </Pressable>

               <Pressable onPress={() => navigation.navigate('comments', { postId: id })} style={{ flexDirection: 'row', marginHorizontal: 20, }}>
                    <Feather name='message-circle' size={20} color='#222222'  />
                    <Text variant='body' marginLeft='s' style={{ color: '#222222', marginLeft: 4 }}>{comments.length}</Text>
               </Pressable>

               <View flexDirection='row'>
                    <Feather name='share-2' size={20} color='#222222'  />
               </View>
            </View>

            {!bookmarkLoading && <Ionicons name={bookmarks.includes(id) ? 'bookmark':'bookmark-outline'} size={25} color='#222222' onPress={handleBookmark} />}
            {bookmarkLoading && <ActivityIndicator size='small' color={Colors.brandColor} />}
        </View>
    </View>
  )
}

const Styles = StyleSheet.create({
    parent: {
        width: '100%',
        backgroundColor: 'white',
        padding: 10,
        marginTop: 10
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

export default PostCard