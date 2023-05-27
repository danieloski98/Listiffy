import { StyleSheet, Image } from 'react-native'
import React from 'react'
import { View, Text } from '..'
import { useDetails } from '../../State/Details'
import { Feather, Ionicons } from '@expo/vector-icons'
import CustomButton from '../generalComponents/Button'
import { Colors } from 'react-native-ui-lib'
import { UserModel } from '../../models/User.Model'
import { Rating } from 'react-native-ratings';
import CustomOutlineButton from '../generalComponents/OutlineButton'
import { useProfileState } from '../../screens/Dashboardtabs/profile/state'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';

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
              <LinearGradient
                colors={[Colors.brandColor, Colors.accentColor]}
                    style={{ width: 76, height: 76, borderRadius: 29, overflow: 'hidden', padding: 4 }}
                >
                <View style={{ width: '100%', height: '100%', borderRadius: 22, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 10}} >
                <Image source={logo && logo !== '' ? { uri: logo }: require('../../../assets/icons/building.png')}  resizeMode='contain' style={{ width: 64, height: 64, borderRadius: 23 }} />
                </View>
              </LinearGradient>
        
           <View paddingLeft='m'>
                <Text variant='subheader'>{business_name}</Text>
                <Text variant='body'>@{business_name}</Text>
           </View>
        </View>

        <View flexDirection='row' alignItems='center' style={{ marginTop: 10 }}>
          <Text variant='body' style={{ fontSize: 17 }}>{rating}</Text>
          <Rating
            type='star'
            ratingCount={5}
            fractions={1}
            readonly
            startingValue={rating}
            imageSize={14}
            ratingBackgroundColor='lightgrey'
            onFinishRating={() => {}}
            ratingColor='lightgrey'
            style={{ paddingVertical: 10, backgroundColor: 'white', alignItems: 'flex-start', marginLeft: 10, }}
          />
          <Text variant='xs' marginLeft='s' style={{ fontSize: 17 }}>({reviews.length})</Text>
        </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }} >
        <Ionicons name='briefcase-outline' size={20} color="grey" />
        <View flexDirection='row' flexWrap='wrap'>
          {services.map((item, index) => <Text variant='body' marginLeft='s' key={index}>{item}{index === services.length - 1 ? '': ','}</Text>)}
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center',  marginTop: 10 }} >
        <Feather name='clock' size={20} color="grey" />
        <Text variant='xs' marginLeft='s' color='brandColor'>Open 24Hours</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
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