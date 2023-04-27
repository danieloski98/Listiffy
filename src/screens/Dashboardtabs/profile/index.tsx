import {} from 'react-native'
import React from 'react'
import ProfilePageHeader from '../../../components/dashboardtabs/ProfilePageHeader'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import ProfileDetails from '../../../components/dashboardtabs/ProfileDetails'
import { View, Text } from '../../../components'
import { useProfileState } from './state'
import CreateBusinessModal from '../../../components/dashboardtabs/Profile/CreateBusinessModal'

const Profile = () => {
  const { setShowModal, showModal } = useProfileState((state) => state);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProfilePageHeader />
      <ScrollView>

        <ProfileDetails />

        <View marginTop='l' marginHorizontal='m' paddingBottom='m' style={{ borderBottomWidth: 2, borderBottomColor: 'lightgrey' }}>
          <Text variant='body'>Your Reviews</Text>
        </View>

        <View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center'}}>
          <Text variant='subheader'>Your have no reviews</Text>
        </View>

      </ScrollView>

      {showModal && <CreateBusinessModal onClose={() => setShowModal(false)} />}
    </GestureHandlerRootView>
  )
}

export default Profile