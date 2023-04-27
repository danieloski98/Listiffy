import { StyleSheet, Image } from 'react-native'
import React from 'react'
import { View, Text } from '..'
import { useDetails } from '../../State/Details'
import { Feather } from '@expo/vector-icons'
import CustomButton from '../generalComponents/Button'
import { Colors } from 'react-native-ui-lib'

const ProfileDetails = () => {
    const { profilePicture, fullName, username, email } = useDetails((state) => state);
    console.log(profilePicture);
  return (
    <View style={Styles.parent} paddingHorizontal='m'>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
           <View style={{ width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: 'lightgrey', padding: 2, overflow: 'hidden' }} backgroundColor='white'>
                <Image source={{ uri: profilePicture }} resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: 10 }} />
           </View>
           <View paddingLeft='m'>
                <Text variant='subheader'>{fullName}</Text>
                <Text variant='body'>@{username}</Text>
           </View>
        </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }} marginTop='l'>
        <Feather name='mail' size={15} color="grey" />
        <Text variant='body' marginLeft='s'>{email}</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Feather name='phone' size={15} color="grey" />
        <Text variant='body' marginLeft='s'>+234 80337646373</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text variant='subheader'>121</Text>
        <Text variant='body' marginLeft='s' style={{ marginTop: 2 }}>Followings</Text>
      </View>

        <View marginVertical='s' />
      <CustomButton label='Edit profile' onPress={() => {}} backgroundColor={Colors.brandColor} />
    </View>
  )
}

const Styles = StyleSheet.create({
    parent: {
        width: '100%',
    }
})

export default ProfileDetails