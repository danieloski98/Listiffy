import React from 'react'
import { View, Text } from '../../..'
import { Image } from 'react-native'
import ReviewCard from '../ReviewCard'

const Reviews = ({ reviews }: { reviews: Array<any>}) => {
  return (
    <View flex={1}>
      { !reviews || reviews.length < 1 && (
        <View flex={1} alignItems='center'>
          <Image source={require('../../../../../assets/images/empty.png')} resizeMode='contain' style={{ width: 200, height: 200 }} />
          <Text variant='body'>No reviews yet</Text>
        </View>
      )}
      { reviews && reviews.length > 0 && reviews.map((item, index) => (
        <ReviewCard key={index} />
      ))}
    </View>
  )
}

export default Reviews