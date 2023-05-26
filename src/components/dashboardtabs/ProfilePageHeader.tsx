import { ActivityIndicator, Alert, StyleSheet } from 'react-native'
import { Switch, Colors } from 'react-native-ui-lib'
import React from 'react'
import { View, Text } from '..'
import { useDetails } from '../../State/Details'
import { useProfileState } from '../../screens/Dashboardtabs/profile/state'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import httpClient from '../../utils/axios'

const ProfilePageHeader = () => {
  const { id } = useDetails((state) => state);
  const { setShowModal, isBusiness, setSwitchModal } = useProfileState((state) => state);

  const { isLoading, data } = useQuery(['getBusiness', id], () => httpClient.get(`/business/${id}`), {
    refetchOnMount: true,
    staleTime: 500,
    cacheTime: 500,
  });


    const handleCheck = React.useCallback(() => {
      if (isLoading) {
        return;
      }
      if (isBusiness) {
       setSwitchModal(true);
      } else if (data?.data && data?.data.data.step === 2 && data?.data.data.completionRate ===100) {
        setSwitchModal(true);
      } else {
        setShowModal(true);
      }
    }
    , [isBusiness, isLoading, data]);
  return (
    <View style={Styles.parent} padding='m'>
      <Text variant='body'>Business Profile</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isLoading && <ActivityIndicator color={Colors.brandColor} size='small' />}
        {!isLoading && <Switch offColor={Colors.grey} onColor={Colors.brandColor} value={isBusiness} onValueChange={handleCheck} />}
      </View>
    </View>
  )
}

const Styles = StyleSheet.create({
    parent: {
        width: '100%',
        height: '12%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    }
})

export default ProfilePageHeader