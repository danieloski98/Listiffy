import React from 'react'
import { View, Text } from '../../../components'
import { Feather } from '@expo/vector-icons'
import { ActivityIndicator, ImageBackground, Pressable, useWindowDimensions } from 'react-native'
import { useDetails } from '../../../State/Details'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors, Dash } from 'react-native-ui-lib'
import { useQuery } from 'react-query'
import httpClient from '../../../utils/axios'
import { useEditBasicState } from './state'
import SelectModal from './Pages/SelectModal'
import AvatarModal from './Pages/AvatarModal'
import { Incubator } from 'react-native-ui-lib';

const {Toast} = Incubator;

const EditBasicProfile = ({ navigation }: { navigation: any }) => {
  const { profilePicture, fullName, username, id, setState } = useDetails((state) => state);
  const { setAvatar, avatar, pickerModal, avatarModal, setPickerModal, avatarUploading, setShowTaost, showToast, message } = useEditBasicState((state) => state)

  const { isLoading, data, error } = useQuery(['getUser', id], () => httpClient.get(`/user/${id}`), {
    onSuccess: (data) => {
      console.log(data.data.data);
      setState(data.data.data);
      setAvatar(profilePicture);
    }
  })

  const { width } = useWindowDimensions()
  return (
    <View flex={1}>
      <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', height: 100, paddingLeft: 10}}>
            <Feather name='chevron-left' size={30} color='black' style={{ marginTop: 2}} />
            <Text variant='body' fontSize={17}>Edit Profile</Text>
        </Pressable>

      {
        isLoading && (
          <View flex={1} alignItems='center' justifyContent='center'>
            <ActivityIndicator size='large' color={Colors.brandColor} />
          </View>
        )
      }

      {
        !isLoading && !error && (
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View paddingHorizontal='m'>
          <ImageBackground  source={{ uri: avatar !== '' ? avatar:''}} style={{ width: 100, height: 100, overflow: 'hidden', borderRadius: 20 }}>
            <Pressable onPress={() => setPickerModal(true)}  style={{ backgroundColor: 'rgba(0, 0, 0, 0.308)', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              {avatarUploading && <ActivityIndicator color={Colors.brandColor} size="large" />}
              {!avatarUploading && <Feather name='camera' size={25} color="white" />}
            </Pressable>
          </ImageBackground>
        </View>

        <View flexDirection='row' justifyContent='space-between' paddingHorizontal='m' marginTop='m'>
          <Text variant='subheader'>PERSONAL INFORMATION</Text>
          <Feather name='edit-2' size={20} color='grey' onPress={() => navigation.navigate('editbasic', { name: 'personalinformation'})} />
        </View>

        <View paddingHorizontal='m' marginTop='l'>
          <Text variant='body' color='black'>Full Name</Text>
          <Text variant='xs'>{data?.data.data.fullName}</Text>
        </View>

        <View paddingHorizontal='m' marginTop='m'>
          <Text variant='body' color='black'>Username</Text>
          <Text variant='xs'>@{data?.data.data.username}</Text>
        </View>


        <Dash vertical={false} style={{ width: '100%', marginVertical: 20 }} thickness={1} length={width} color='grey' />

        <View height={20} />

        <View paddingHorizontal='m' marginTop='l' flexDirection='row' justifyContent='space-between' alignItems='center'>
          <View>
            <Text variant='body' color='black'>Followed Pages</Text>
            <Text variant='xs'>update business pages you follow</Text>
          </View>

          <Feather name='edit-2' size={20} color='grey' onPress={() => navigation.navigate('editbasic', { name: 'pages'})} />
        </View>

        <View paddingHorizontal='m' marginTop='m' flexDirection='row' justifyContent='space-between' alignItems='center'>
          <View>
            <Text variant='body' color='black'>Liked services/categories </Text>
            <Text variant='xs'>update categories and services you follow</Text>
          </View>

          <Feather name='edit-2' size={20} color='grey' onPress={() => navigation.navigate('editbasic', { name: 'categories'})} />
        </View>


      </ScrollView>
        )
      }
      {pickerModal && <SelectModal />}
      {avatarModal && <AvatarModal />}
    </View>
  )
}

export default EditBasicProfile