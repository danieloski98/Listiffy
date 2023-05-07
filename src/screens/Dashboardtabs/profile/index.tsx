import React from 'react'
import ProfilePageHeader from '../../../components/dashboardtabs/ProfilePageHeader'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { useProfileState } from './state'
import CreateBusinessModal from '../../../components/dashboardtabs/Profile/CreateBusinessModal'
import BasicProfile from '../../../components/dashboardtabs/Profile/BasicProfile'
import { useWindowDimensions } from 'react-native'
import BusinessProfile from '../../../components/dashboardtabs/Profile/BusinessProfile'
import ShowPinModal from '../../../components/dashboardtabs/Profile/ShowPinModal'
import { useDetails } from '../../../State/Details'

const Profile = () => {
  const { isCompany } = useDetails(((state) => state))
  const { setShowModal, showModal, showPinModal, setShowPinModal, isBusiness, setBusiness } = useProfileState((state) => state);
  const { height } = useWindowDimensions()

  React.useEffect(() => {
    setBusiness(isCompany);
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
        <ProfilePageHeader />
        <ScrollView style={{ height }} contentContainerStyle={{  }} showsVerticalScrollIndicator={false}>

          { !isBusiness && <BasicProfile /> }
          { isBusiness && <BusinessProfile /> }

        </ScrollView>

      {showModal && <CreateBusinessModal onClose={() => setShowModal(false)} />}
      { showPinModal && <ShowPinModal onClose={() => setShowPinModal(false)} />}
    </GestureHandlerRootView>
  )
}

export default Profile