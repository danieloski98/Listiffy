import { StyleSheet } from 'react-native'
import { Switch, Colors } from 'react-native-ui-lib'
import React from 'react'
import { View, Text } from '..'
import { useDetails } from '../../State/Details'
import CreateBusinessModal from './Profile/CreateBusinessModal'
import { useProfileState } from '../../screens/Dashboardtabs/profile/state'

const ProfilePageHeader = () => {
  const { profilePicture, fullName, username, email, isCompany } = useDetails((state) => state);
  const { setShowModal } = useProfileState((state) => state);
    const [checked, setChecked] = React.useState(false);

    const handleChack = React.useCallback(() => {
      if (!checked && !isCompany) {
        setShowModal(true);
      } else {
        setChecked(prev => !prev);
      }
    }
    , [checked]);
  return (
    <View style={Styles.parent} padding='m'>
      <Text variant='body'>Business Profile</Text>
      <Switch offColor={Colors.grey} onColor={Colors.brandColor} value={checked} onValueChange={handleChack} />
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