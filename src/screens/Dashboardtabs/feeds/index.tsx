import React from 'react'
import FeedsHeader from '../../../components/dashboardtabs/FeedsHeader'
import { View, Text } from '../../../components'
import AdsPanel from '../../../components/dashboardtabs/AdsPanel'
import PostCard from '../../../components/dashboardtabs/PostCard'
import CreatePost from '../../../components/dashboardtabs/Feeds/Modals/CreatePost'
import { useFeedsState } from './state'
import { GestureHandlerRootView, ScrollView, RefreshControl, FlatList } from 'react-native-gesture-handler'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import httpClient from '../../../utils/axios'
import { AxiosProgressEvent } from 'axios'
import PostProgressReport from '../../../components/dashboardtabs/Feeds/PostProgressReport'
import { useDetails } from '../../../State/Details'
import handleToast from '../../../hooks/handleToast'
import { PostModel } from '../../../models/PostModel'
import { Colors } from 'react-native-ui-lib'
import CommentModal from '../../../components/dashboardtabs/Feeds/Modals/Comment'
import { BookmarkModel } from '../../../models/Bookmark'


const Feeds = () => {
  const { showPost, showComment, setAll, bookmarks, state } = useFeedsState((state) => state);
  const { id } = useDetails((state) => state);
  const { ShowToast } = handleToast();
  const queryClient = useQueryClient()
  const [progress, setProgress] = React.useState(0);
  const [posts, setPosts] = React.useState<Array<PostModel>>([]);
  const { isLoading: loading, data, isError, refetch } = useQuery(['getPosts'], () => httpClient.get(`/post?state=${state}`), {
    onSuccess: (data) => {
      console.log(data.data.data[0]);
      setPosts(data.data.data);
    },
    onError: (error: any) => {
      ShowToast({ message: error, preset: 'failure' });
    }
  });

  // get feeds bookmarks
  const { isLoading: bookmarkloading } = useQuery(['getFeedsBookmark'], () => httpClient.get(`/post/bookmark/for-feed/${id}`), {
    onSuccess: (data) => {
      let arr: string[] = [];
      const newbookmarks = data.data.data as Array<BookmarkModel>;
      newbookmarks.map((item) => {
        arr.push(item.postId);
      });
      setAll({ bookmarks: [...bookmarks, ...arr] });
    },
    onError: (error: any) => {
      ShowToast({ message: error, preset: 'failure' });
    }
  });
  const { isLoading, mutate } = useMutation({
    mutationFn: (data: FormData) => httpClient.post(`/post/${id}`, data, {
      onUploadProgress(progressEvent: AxiosProgressEvent) {
        handleProgress(progressEvent)
      },
    }),
    onSuccess: () => {
      setAll({ showPost: false });
      setProgress(0)
    },
    onError: (error: string) => {
      ShowToast({ message: error, preset: 'failure' });
      setProgress(0)
    }
  });

  React.useEffect(() => {
    console.log(progress);
  }, [progress]);

  const handleProgress = React.useCallback((progressEvent: AxiosProgressEvent) => {
    if (progressEvent.total) {
      const percentage = (progressEvent.loaded / progressEvent.total) * 100;
      setProgress(percentage); 
    }
  }, [progress]);

  const handleRefetch = React.useCallback(() => {
    refetch();
    queryClient.invalidateQueries();
    queryClient.refetchQueries();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'whitesmoke' }}>
      <FeedsHeader />
      <AdsPanel />
      {isLoading && <PostProgressReport progress={progress} />}
      <FlatList 
        key={'postslist'}
        keyExtractor={(item: PostModel, index) => index.toString()}
        data={posts}
        renderItem={({ item }) => <PostCard data={item} />}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefetch} title='Loading Posts' titleColor={Colors.brandColor} tintColor={Colors.brandColor} colors={[Colors.brandColor]} />}
      />

      {/* MODALS */}
      {showPost && <CreatePost submit={mutate} onClose={() => setAll({ showPost: false })} />}
      {showComment && <CommentModal onClose={() => setAll({ showComment: false })} />}
    </GestureHandlerRootView>
  )
}

export default Feeds