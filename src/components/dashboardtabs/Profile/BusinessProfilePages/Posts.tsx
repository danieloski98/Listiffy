import React from 'react'
import { View, Text } from '../../..'
import { Image, Pressable, useWindowDimensions } from 'react-native'
import { PostModel } from '../../../../models/PostModel'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const PostImage = ({ images, id }: PostModel) => {
  const WIDTH = (useWindowDimensions().width / 100 ) * 28
  const navigation = useNavigation<any>();
  return (
    <Pressable onPress={() => navigation.navigate('published-post', { id } )} style={{ height: 136, width: WIDTH, borderRadius: 15, overflow: 'hidden', marginBottom: 10 }} >
      <Image source={{ uri: images[0] }} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
    </Pressable>
  )
}

const Posts = ({ posts }: { posts: Array<any>}) => {
  if (!posts || posts.length < 1) {
    return (
      <View flex={1} alignItems='center'>
        <Image source={require('../../../../../assets/images/empty.png')} resizeMode='contain' style={{ width: 200, height: 200 }} />
        <Text variant='body'>No posts yet</Text>
      </View>
    )
  }
  return (
    <ScrollView 
      contentContainerStyle={{  }}
      horizontal={false}
      centerContent
    >
      <View flexDirection='row' flexWrap='wrap' justifyContent='space-between'>
      {posts.map((item: PostModel, index) => {
        if (item.images.length < 1) {
          return;
        } else {
          return (
            <PostImage {...item} key={index} />
          )}
      })}
      </View>
    </ScrollView>
  )
}

export default Posts