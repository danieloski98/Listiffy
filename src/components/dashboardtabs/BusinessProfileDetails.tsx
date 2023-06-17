import { StyleSheet, Image, Pressable } from 'react-native'
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
  isView?: boolean
  id: string
}


const BusinessProfileDetails = ({ business_name, logo, rating, services, followers, reviews, isView = false, id: businessId }: CompanyDetails) => {
  console.log(followers);
  const { setShowPinModal } = useProfileState((state) => state);
  const [followerss, setFollowers] = React.useState<Array<string>>([])
  const { id } = useDetails((state) => state)
  const navigation = useNavigation<any>();

  React.useEffect(() => {
    const arr: any = [];
    followers.map((item: any) => {
      arr.push(item.user_id);
    });
    setFollowers(arr);
  }, [followers])

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
                <Text variant='medium'>{business_name}</Text>
                <Text variant='body'>@{business_name}</Text>
           </View>
        </View>

        <View flexDirection='row' alignItems='center' style={{ marginTop: 10 }}>
          <Text variant='body' style={{ fontSize: 17 }}>{rating.toFixed(1)}</Text>
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
        <Text variant='medium'>{followers.length}</Text>
        <Text variant='body' marginLeft='s' style={{ marginTop: 2 }}>Followers</Text>
      </View>

      {
        isView && businessId !== id &&
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Text variant='body' marginLeft='s' color='brandColor' style={{ marginTop: 2 }}>{followerss.includes(id) ? 'Following':'Follow'}</Text>
          <Feather name={followerss.includes(id) ? 'check' : 'plus'} size={25} color={Colors.brandColor} />
        </Pressable>
      }

        <View marginVertical='s' />

        {!isView && (
          <View flexDirection='row'>

            <View flex={1}>
                <CustomButton label='Share PIN' onPress={() => setShowPinModal(true)} backgroundColor={Colors.brandColor} />
            </View>

            <View flex={1} paddingHorizontal='s'>
                <CustomOutlineButton label='Edit profile' onPress={() => navigation.navigate('editbusinessprofile') } />
            </View>

          </View>
        )}

      {isView && businessId !== id && (
          <View flexDirection='row'>

            <View flex={1}>
                <CustomButton label='Write Review' onPress={() => navigation.navigate('write-review', { id: businessId }) } backgroundColor={Colors.brandColor} />
            </View>

            <View flex={1} paddingHorizontal='s'>
                <CustomOutlineButton label='Contact Me' onPress={() => {}} />
            </View>

          </View>
        )}
    </View>
  )
}

const Styles = StyleSheet.create({
    parent: {
        width: '100%',
    }
})

export default BusinessProfileDetails