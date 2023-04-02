import React from 'react'
import { View, Text } from '../../../../components'
import { useQuery } from 'react-query'
import httpClient from '../../../../utils/axios'
import { ActivityIndicator, Image, Pressable } from 'react-native'
import { Colors } from 'react-native-ui-lib'
import { useAccountSetupState } from '../state'

interface IAvatar {
    url: string;
    id: string;
}

const Avatars = () => {
    const { isLoading, data } = useQuery(['getAvatars'], () => httpClient.get('/avatar'));
    const { setAvatar, setAvatarModal } = useAccountSetupState((state) => state)

    const handleAvatarSelected = React.useCallback((url: string) => {
        setAvatar(url);
        setAvatarModal(false);
    }, [])
  return (
    <View style={{ flex: 1 }}>
      <Text variant='subheader'>Select an avatar</Text>
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