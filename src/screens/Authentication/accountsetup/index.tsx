import { Colors, Button } from 'react-native-ui-lib'
import { useAccountSetupState } from './state'

import React from 'react'
import { ImageBackground } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Fullname from './pages/Fullname'
import Picture from './pages/Picture'
import { View, Text } from '../../../components'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import SelectModal from './pages/SelectModal'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AvatarModal from './pages/AvatarModal'
import Business from './pages/Business'
import Interest from './pages/Interest'
import Location from './pages/Location'
import Wizard from '../../../components/generalComponents/Wizard'

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

const AccountSetup = ({ navigation }: IProps) => {
  // zustand state
  const stage = useAccountSetupState((state) => state.stage);
  const setStage = useAccountSetupState((state) => state.setStage);
  const { pickerModal, avatarModal } = useAccountSetupState((state) => state)

  const handleBack = React.useCallback(() => {
    if (stage === 0) {
      navigation.goBack();
    } else {
      setStage(stage - 1);
    }
  }, [stage])
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {
        stage < 4 && (
          <View style={{ height: '20%', width: '100%', backgroundColor: '#19AD80' }}>
            <View style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
              <View style={{ height: '50%', width: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: 20, paddingHorizontal: 10 }}>
                {stage > 0 && <Feather name='chevron-left' size={30} color='white' onPress={handleBack} />}
                <Text variant='medium' color='white' marginLeft='m'>Set up your account</Text>
              </View>
              <Wizard activeIndex={stage} count={4} />
              {/* <Wizard activeIndex={stage} onActiveIndexChanged={() => console.log('changed')} containerStyle={{ backgroundColor: 'transparent' }}>
                <Wizard.Step state={Wizard.States.ENABLED} circleSize={40} circleColor={'transparent'} color={Colors.black} circleBackgroundColor={stage > 0 ? Colors.accentColor : Colors.white} enabled />
                <Wizard.Step state={Wizard.States.ENABLED} circleSize={40} circleColor={Colors.transparent} color={Colors.black} circleBackgroundColor={stage > 1 ? Colors.accentColor : Colors.white} enabled />
                <Wizard.Step state={Wizard.States.ENABLED} circleSize={40} circleColor={Colors.transparent} color={Colors.black} circleBackgroundColor={stage > 2 ? Colors.accentColor : Colors.white} enabled />
                <Wizard.Step state={Wizard.States.ENABLED} circleSize={40} circleColor={Colors.transparent} color={Colors.black} circleBackgroundColor={stage > 3 ? Colors.accentColor : Colors.white} enabled />
              </Wizard> */}
            </View>
          </View>
        )
      }
      <View style={{ flex: 1 }}>
        {stage === 0 && <Fullname />}
        {stage === 1 && <Picture />}
        {stage === 2 && <Business />}
        {stage === 3 && <Interest />}
        {stage === 4 && <Location />}
      </View>

      {pickerModal && <SelectModal />}
      {avatarModal && <AvatarModal />}
    </GestureHandlerRootView>
  )
}

export default AccountSetup