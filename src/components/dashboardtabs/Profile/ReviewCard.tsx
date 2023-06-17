import React from 'react'
import { View, Text } from '../..'
import { Image } from 'react-native'
import { Rating } from 'react-native-ratings';
import { ReviewModel } from '../../../models/ReviewModel';
import TimeAgo from 'react-native-timeago';



const ReviewCard = ({
  rating,
  review,
  createdAt,
  images,
  user: {
    username,
    profilePicture,
    fullName
  }
}: ReviewModel) => {
  return (
    <View flex={1} marginVertical='l'>

      <View flexDirection='row'>
        {/* IMAGE BOX */}
        <View width={62} height={62}>
          <Image source={{ uri: profilePicture}} resizeMode='contain' style={{ width: '100%', height: '100%', borderRadius: 10 }} />
        </View>

        <View marginLeft='m'>

          {/* TEXTS */}
          <View flexDirection='row' alignItems='center'>
            <Text variant='medium'>{fullName}</Text>
            <Text variant='xs' marginLeft='s'  style={{ fontSize: 14, marginTop: 4 }}>@{username || 'daniel'}</Text>
          </View>

          <View  width={100} height={24} borderRadius={30} backgroundColor='brandColor' alignItems='center' style={{ marginVertical: 5}}>
            <Text variant='body' color='white' style={{ fontSize: 14, marginTop: 1 }}>CUSTOMER</Text>
          </View>
          
          <Text variant='body'>
            <TimeAgo time={createdAt} interval={20000} />
          </Text>

        </View>

      </View>

      <View flexDirection='row' alignItems='center'>
        <Text variant='body'>{rating.toFixed(1)}</Text>
        <Rating
          type='star'
          ratingCount={5}
          fractions={1}
          readonly
          startingValue={rating}
          imageSize={14}
          ratingBackgroundColor='transparent'
          onFinishRating={() => {}}
          style={{ paddingVertical: 10, backgroundColor: 'white', alignItems: 'flex-start', marginLeft: 10 }}
        />
      </View>

      <View>
          <Text variant='body'>{review}</Text>
      </View>

      <View flexDirection='row' flexWrap='wrap' marginTop='s'>
          {images.length > 0 && images.map((item, index) => (
            <Image key={index} source={{ uri: item }} resizeMode='contain' style={{ width: 40, height: 40, borderRadius: 10 }} />
          ))}
      </View>

    </View>
  )
}

export default ReviewCard