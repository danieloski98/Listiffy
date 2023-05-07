import React from 'react'
import { View, Text } from '../../..'
import { Image } from 'react-native'
import ReviewCard from '../ReviewCard'

const Posts = ({ posts }: { posts: Array<any>}) => {
  return (
    <View flex={1}>
      { !posts || posts.length < 1 && (
        <View flex={1} alignItems='center'>
          <Image source={require('../../../../../assets/images/empty.png')} resizeMode='contain' style={{ width: 200, height: 200 }} />
          <Text variant='body'>No posts yet</Text>
        </View>
      )}
      { posts && posts.length > 0 && posts.map((item, index) => (
        <ReviewCard key={index} />
      ))}
    </View>
  )
}

export default Posts