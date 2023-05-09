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
  const [loading, setLoading] = React.useState(false);
  const [business, setBus] = React.useState(false);
  const { setShowModal, setBusiness, isBusiness } = useProfileState((state) => state);
  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery(['getBusiness', id], () => httpClient.get(`/business/${id}`), {
    refetchOnMount: true,
  });

  const { mutate, isLoading: httpLoading } = useMutation({
    mutationFn: () => httpClient.put(`/user/switch-account/${isBusiness ? 'to-user':'to-business'}/${id}`),
    onSuccess: (data) => {
      Alert.alert('Success', data.data.message);
      setBusiness(!isBusiness);
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
      Alert.alert('Error', error);
    }
  })


    const handleCheck = React.useCallback(() => {
      if (isLoading) {
        return;
      }

      if (data?.data.data.step <= 2 && data?.data.data.completionRate < 100) {
        setShowModal(true);
        return;
      } else {
        mutate()
      }
    }
    , [isBusiness, isLoading, data, error]);
  return (
    <View style={Styles.parent} padding='m'>
      <Text variant='body'>Business Profile</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {httpLoading || isLoading && <ActivityIndicator color={Colors.brandColor} size='small' />}
        {!httpLoading && !isLoading && <Switch offColor={Colors.grey} onColor={Colors.brandColor} value={isBusiness} onValueChange={handleCheck} />}
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