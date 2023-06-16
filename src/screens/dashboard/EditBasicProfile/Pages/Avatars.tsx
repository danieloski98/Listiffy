import React from 'react'
import { View, Text } from '../../../../components'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import httpClient from '../../../../utils/axios'
import { ActivityIndicator, Alert, Image, Pressable } from 'react-native'
import { Colors } from 'react-native-ui-lib'
import { useEditBasicState } from '../state'
import { useDetails } from '../../../../State/Details'
import { useNavigation } from '@react-navigation/native'
import handleToast from '../../../../hooks/handleToast'

interface IAvatar {
    url: string;
    id: string;
}

const Avatars = () => {
  const navigation = useNavigation();
  const { ShowToast } = handleToast();
    const { id, setState, profilePicture,  } = useDetails((state) => state)
    const { isLoading, data } = useQuery(['getAvatars'], () => httpClient.get('/avatar'));
    const { setAvatar, setAvatarModal, setAvatarUploading, setShowTaost } = useEditBasicState((state) => state);
    const queryClient = useQueryClient();

    const uploadLink = useMutation({
        mutationFn: (data: FormData| any) => httpClient.put(`/user/profilepic/link/${id}`, data),
        onError: (error: string) => {
          Alert.alert('Error', error);
          setAvatarUploading(false);
          ShowToast({ message: 'Failed to update avatar', preset: 'failure' });
        },
        onSuccess: (data) => {
          setAvatarModal(false);
          queryClient.invalidateQueries();
          setAvatarUploading(false);
          ShowToast({ message: 'Avatar updated successfully', preset: 'success' });
        }
      })

    const handleAvatarSelected = React.useCallback((url: string) => {
        setAvatar(url);
        setState({ profilePicture: url  })
        setAvatarUploading(true);
        uploadLink.mutate({ avatar: url })
    }, [])
  return (
    <View style={{ flex: 1 }}>
      <Text variant='medium'>Select an avatar</Text>
      <Text variant='body'>Show your style using an avatar</Text>

      <View style={{ flex: 1, marginTop: 20, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
        {isLoading && <ActivityIndicator color={Colors.brandColor} /> }
        {!isLoading && data?.data !== undefined && (data?.data.data as Array<IAvatar>).map((item, index) => (
            <Pressable onPress={() => handleAvatarSelected(item.url)} key={index} style={{ width: 80, height: 80, borderRadius: 50, margin: 10 }}>
                <Image  source={{ uri: item.url }} resizeMode='contain' style={{ width: '100%', height: '100%', borderRadius: 50, }} />
            </Pressable>
        ))}
      </View>
    </View>
  )
}

export default Avatars