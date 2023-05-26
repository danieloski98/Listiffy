import React from 'react'
import ProfilePageHeader from '../../../components/dashboardtabs/ProfilePageHeader'
import { GestureHandlerRootView, ScrollView, RefreshControl } from 'react-native-gesture-handler'
import { useProfileState } from './state'
import CreateBusinessModal from '../../../components/dashboardtabs/Profile/CreateBusinessModal'
import BasicProfile from '../../../components/dashboardtabs/Profile/BasicProfile'
import { useWindowDimensions } from 'react-native'
import BusinessProfile from '../../../components/dashboardtabs/Profile/BusinessProfile'
import ShowPinModal from '../../../components/dashboardtabs/Profile/ShowPinModal'
import { useDetails } from '../../../State/Details'
import { useQueryClient } from 'react-query'
import { Colors } from 'react-native-ui-lib'
import SwitchBusinessModal from '../../../components/dashboardtabs/Profile/SwitchToBusinessModal'
import SwitchToBusinessModal from '../../../components/dashboardtabs/Profile/SwitchToBusinessModal'

const Profile = () => {
  const { isCompany } = useDetails(((state) => state))
  const { setShowModal, showModal, showPinModal, setShowPinModal, isBusiness, setBusiness, switchModal, setSwitchModal } = useProfileState((state) => state);
  const { height } = useWindowDimensions()
  const [refreshing, setRefreshing] = React.useState(false);
  const queryClient = useQueryClient();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    queryClient.invalidateQueries({fetching: true,})
    .then(() => {
      setRefreshing(false);
    })
    .catch(() => { setRefreshing(false)})
  }, []);

  React.useEffect(() => {
    setBusiness(isCompany);
  }, [isCompany]);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
        <ProfilePageHeader />
        <ScrollView 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.brandColor]} />}
        style={{ height }} contentContainerStyle={{  }} showsVerticalScrollIndicator={false}>

          { !isBusiness && <BasicProfile /> }
          { isBusiness && <BusinessProfile /> }

        </ScrollView>

      { showModal && <CreateBusinessModal onClose={() => setShowModal(false)} />}
      { showPinModal && <ShowPinModal onClose={() => setShowPinModal(false)} />}
      { switchModal && <SwitchToBusinessModal onClose={() => setSwitchModal(false)} />}
    </GestureHandlerRootView>
  )
}

export default Profile