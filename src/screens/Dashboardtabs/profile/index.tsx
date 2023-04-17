import { View, Text } from 'react-native'
import React from 'react'
import ProfilePageHeader from '../../../components/dashboardtabs/ProfilePageHeader'
import { ScrollView } from 'react-native-gesture-handler'
import ProfileDetails from '../../../components/dashboardtabs/ProfileDetails'

const Profile = () => {
  return (
    <View style={{ flex: 1 }}>
      <ProfilePageHeader />
      <ScrollView>
        <ProfileDetails />
      </ScrollView>
    </View>
  )
}

export default Profile