import React from 'react'
import { View, Text } from '../..'
import { Image } from 'react-native'
import { Rating } from 'react-native-ratings';


const ReviewCard = () => {
  return (
    <View flex={1} marginVertical='l'>

      <View flexDirection='row'>
        {/* IMAGE BOX */}
        <View width={62} height={62}>
          <Image source={require(('../../../../assets/images/man.png'))} resizeMode='contain' style={{ width: '100%', height: '100%', borderRadius: 10 }} />
        </View>

        <View marginLeft='m'>

          {/* TEXTS */}
          <View flexDirection='row' alignItems='center'>
            <Text variant='subheader'>Alfredo Bbator</Text>
            <Text variant='xs' marginLeft='s'  style={{ fontSize: 14 }}>@bator</Text>
          </View>

          <View  width={100} height={24} borderRadius={30} backgroundColor='brandColor' alignItems='center' style={{ marginVertical: 5}}>
            <Text variant='body' color='white' style={{ fontSize: 14, marginTop: 1 }}>CUSTOMER</Text>
          </View>
          
          <Text variant='body'>1month ago</Text>

        </View>

      </View>

      <View flexDirection='row' alignItems='center'>
        <Text variant='body'>3.5</Text>
        <Rating
          type='star'
          ratingCount={5}
          fractions={1}
          startingValue={3.5}
          imageSize={14}
          ratingBackgroundColor='transparent'
          onFinishRating={() => {}}
          style={{ paddingVertical: 10, backgroundColor: 'white', alignItems: 'flex-start', marginLeft: 10 }}
        />
      </View>

      <View>
          <Text variant='body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur euismod morbi suscipit risus mattis fermentum lectus diam amet.</Text>
      </View>

      <View flexDirection='row' flexWrap='wrap' marginTop='s'>
        <Image source={require(('../../../../assets/images/man.png'))} resizeMode='contain' style={{ width: 40, height: 40, borderRadius: 10 }} />
        <Image source={require(('../../../../assets/images/man.png'))} resizeMode='contain' style={{ width: 40, height: 40, borderRadius: 10, marginHorizontal: 5 }} />
      </View>

    </View>
  )
}

export default ReviewCard