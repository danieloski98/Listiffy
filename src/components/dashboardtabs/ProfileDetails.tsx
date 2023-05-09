import { StyleSheet, Image } from 'react-native'
import React from 'react'
import { View, Text } from '..'
import { useDetails } from '../../State/Details'
import { Feather } from '@expo/vector-icons'
import CustomButton from '../generalComponents/Button'
import { Colors } from 'react-native-ui-lib'
import { UserModel } from '../../models/User.Model'
import { useNavigation } from '@react-navigation/native'

const ProfileDetails = ({ profilePicture, fullName, username, email, phone = '', following}: UserModel) => {
  const navigation = useNavigation<any>();

  return (
    <View style={Styles.parent} paddingHorizontal='m'>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
           <View style={{ width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: 'lightgrey', padding: 2, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }} backgroundColor='white'>
                <Image source={{ uri: profilePicture }} resizeMode='cover' style={{ width: '95%', height: '95%', borderRadius: 30 }} />
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
        { phone && phone !== '' && <Text variant='xs' marginLeft='s'>{phone}</Text>}
        { phone === '' && <Text variant='xs' color='brandColor' marginLeft='s'>Add phone number</Text>}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text variant='subheader'>{following.length}</Text>
        <Text variant='body' marginLeft='s' style={{ marginTop: 2 }}>Followings</Text>
      </View>

        <View marginVertical='s' />
      <CustomButton label='Edit profile' onPress={() => navigation.navigate('editbasicprofile')} backgroundColor={Colors.brandColor} />
    </View>
  )
}

const Styles = StyleSheet.create({
    parent: {
        width: '100%',
    }
})

export default ProfileDetails