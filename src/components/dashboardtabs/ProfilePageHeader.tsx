import { ActivityIndicator, Alert, StyleSheet } from 'react-native'
import { Switch, Colors } from 'react-native-ui-lib'
import React from 'react'
import { View, Text } from '..'
import { useDetails } from '../../State/Details'
import { useProfileState } from '../../screens/Dashboardtabs/profile/state'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import httpClient from '../../utils/axios'
import { FireStoreDb } from '../../firebase'
import { collection, query, where, getDocs, getDoc, doc, setDoc } from "firebase/firestore";


const ProfilePageHeader = () => {
  const { id } = useDetails((state) => state);
  const [loading, setLoading] = React.useState(false);
  const [business, setBus] = React.useState(false);
  const { setShowModal, setBusiness, isBusiness } = useProfileState((state) => state);
  const queryClient = useQueryClient();
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

  const docRef = doc(FireStoreDb, 'Verification', id)

  React.useEffect(() => {
    (async function() {
     setLoading(true);
     const docSnapShot = await getDoc(docRef);
     if(docSnapShot.exists()) {
         if (docSnapShot.data().step === 2 && docSnapShot.data().completionRate === 100 ) {
          setBus(true);
         }
         setLoading(false);
     } else {
         setBus(false);
          setLoading(false);
     }
    })()
 }, [])

  const { isLoading, data, error } = useQuery(['getBusiness', id], () => httpClient.get(`/business/${id}`));

    const handleChack = React.useCallback(() => {
      if (!isBusiness && !isLoading && !loading && !business) {
        setShowModal(true);
      } else {
        mutate()
      }
    }
    , [isBusiness, isLoading, loading, business]);
  return (
    <View style={Styles.parent} padding='m'>
      <Text variant='body'>Business Profile</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {httpLoading && <ActivityIndicator color={Colors.brandColor} size='small' />}
        <Switch offColor={Colors.grey} onColor={Colors.brandColor} value={isBusiness} onValueChange={handleChack} />
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