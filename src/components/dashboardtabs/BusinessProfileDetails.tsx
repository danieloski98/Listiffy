import { StyleSheet, Image } from 'react-native'
import React from 'react'
import { View, Text } from '..'
import { useDetails } from '../../State/Details'
import { Feather } from '@expo/vector-icons'
import CustomButton from '../generalComponents/Button'
import { Colors } from 'react-native-ui-lib'
import { UserModel } from '../../models/User.Model'
import { Rating } from 'react-native-ratings';
import CustomOutlineButton from '../generalComponents/OutlineButton'
import { useProfileState } from '../../screens/Dashboardtabs/profile/state'
import { useNavigation } from '@react-navigation/native'

interface CompanyDetails {
  business_name: string
  logo: string
  rating: number
  services: Array<string>
  followers: Array<any>
  reviews: Array<any>
}


const BusinessProfileDetails = ({ business_name, logo, rating, services, followers, reviews }: CompanyDetails) => {
  const { setShowPinModal } = useProfileState((state) => state)
  const navigation = useNavigation<any>();

  return (
    <View style={Styles.parent} paddingHorizontal='m'>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: 'lightgrey', padding: 2, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }} backgroundColor='white'>
                <Image source={logo && logo !== '' ? { uri: logo }: require('../../../assets/appicon.png')}  resizeMode='cover' style={{ width: '95%', height: '95%', borderRadius: 30 }} />
           </View>
           <View paddingLeft='m'>
                <Text variant='subheader'>{business_name}</Text>
                <Text variant='body'>@{business_name}</Text>
           </View>
        </View>

        <View flexDirection='row' alignItems='center'>
        <Text variant='body'>{rating}</Text>
        <Rating
          type='star'
          ratingCount={5}
          fractions={1}
          readonly
          startingValue={rating}
          imageSize={14}
          ratingBackgroundColor='transparent'
          onFinishRating={() => {}}
           
          style={{ paddingVertical: 10, backgroundColor: 'white', alignItems: 'flex-start', marginLeft: 10, }}
        />
        <Text variant='xs' marginLeft='s'>({reviews.length})</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }} >
        <Feather name='briefcase' size={20} color="grey" />
        <View flexDirection='row' flexWrap='wrap'>
          {services.map((item, index) => <Text variant='xs' marginLeft='s' key={index}>{item} {index === services.length - 1 ? '': ','}</Text>)}
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }} >
        <Feather name='clock' size={15} color="grey" />
        <Text variant='xs' marginLeft='s' color='brandColor'>Open 24Hours</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text variant='subheader'>{followers.length}</Text>
        <Text variant='body' marginLeft='s' style={{ marginTop: 2 }}>Followers</Text>
      </View>

        <View marginVertical='s' />

        <View flexDirection='row'>

            <View flex={1}>
                <CustomButton label='Share PIN' onPress={() => setShowPinModal(true)} backgroundColor={Colors.brandColor} />
            </View>

            <View flex={1} paddingHorizontal='s'>
                <CustomOutlineButton label='Edit profile' onPress={() => navigation.navigate('editbusinessprofile') } />
            </View>

        </View>
    </View>
  )
}

const Styles = StyleSheet.create({
    parent: {
        width: '100%',
    }
})

export default BusinessProfileDetails