import { Colors, Wizard, Button } from 'react-native-ui-lib'
import { useWindowDimensions } from 'react-native'
import { useAccountSetupState } from './state'

import React from 'react'
import { ImageBackground } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { View, Text } from '../../../../components'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BusinessName from './pages/BusinessName'
import Services from './pages/Services'
import Location from './pages/Location'
import OpeningHours from './pages/OpeningHours'
import Contact from './pages/Contact'

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

const AccountSetup = ({ navigation }: IProps) => {
  // zustand state
  const setStage = useAccountSetupState((state) => state.setStage);
  const { stage } = useAccountSetupState((state) => state);

  const { height} = useWindowDimensions();

  const handleBack = React.useCallback(() => {
    if (stage === 0) {
      navigation.goBack();
    } else {
      setStage(stage - 1);
    }
  }, [stage])
  return (
    <GestureHandlerRootView style={{ flex: 1, minHeight: height }}>
   
          <View style={{ height: '20%', width: '100%', backgroundColor: Colors.brandColor }}>
            <ImageBackground source={require('../../../../../assets/images/meshbackground.png')} resizeMode='cover' style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
              <View style={{ height: '63%', width: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: 20, paddingHorizontal: 10 }}>
                {stage > 0 && <Feather name='chevron-left' size={30} color='white' onPress={handleBack} />}
                <Text variant='subheader' color='white' marginLeft='m'>Set up your account</Text>
              </View>
              <Wizard activeIndex={stage} onActiveIndexChanged={() => console.log('changed')} containerStyle={{ backgroundColor: 'transparent' }}>
                <Wizard.Step state={Wizard.States.ENABLED} circleSize={40} circleColor={'transparent'} color={Colors.black} circleBackgroundColor={stage > 0 ? Colors.accentColor : Colors.white} enabled />
                <Wizard.Step state={Wizard.States.ENABLED} circleSize={40} circleColor={Colors.transparent} color={Colors.black} circleBackgroundColor={stage > 1 ? Colors.accentColor : Colors.white} enabled />
                <Wizard.Step state={Wizard.States.ENABLED} circleSize={40} circleColor={Colors.transparent} color={Colors.black} circleBackgroundColor={stage > 2 ? Colors.accentColor : Colors.white} enabled />
                <Wizard.Step state={Wizard.States.ENABLED} circleSize={40} circleColor={Colors.transparent} color={Colors.black} circleBackgroundColor={stage > 3 ? Colors.accentColor : Colors.white} enabled />
                <Wizard.Step state={Wizard.States.ENABLED} circleSize={40} circleColor={Colors.transparent} color={Colors.black} circleBackgroundColor={stage > 4 ? Colors.accentColor : Colors.white} enabled />
              </Wizard>
            </ImageBackground>
          </View>
    
      <View style={{ flex: 1 }}>
        {stage === 0 && <BusinessName />}
        {stage === 1 && <Services />}
        {stage === 2 && <OpeningHours />}
        {stage === 3 && <Location />}
        {stage === 4 && <Contact />}
      </View>

    </GestureHandlerRootView>
  )
}

export default AccountSetup