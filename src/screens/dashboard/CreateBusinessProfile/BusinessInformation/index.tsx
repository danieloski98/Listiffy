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
import { doc, setDoc } from "firebase/firestore"; 
import { FireStoreDb } from '../../../../firebase'
import { useDetails } from '../../../../State/Details'

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

const AccountSetup = ({ navigation }: IProps) => {
  // zustand state
  const setStage = useAccountSetupState((state) => state.setStage);
  const { stage, address, business_name, company_email, state, lga, instagram_username, isPhysical, opening_hours, services, whatsapp_number, phone, website, twitter_username } = useAccountSetupState((state) => state);
  const { id } = useDetails((state) => state)
  const { height} = useWindowDimensions();
  const [saving, setSaving] = React.useState(false);


  const handlePercentage = React.useCallback(() => {
    switch(stage) {
      case 0:
        return 20
      case 1:
        return 40
      case 2:
        return 60
      case 3:
        return 80
      case 4:
        return 90
      default:
        return 0
    
    }
  }, [stage]);

  const handleSave = async () => {
    setSaving(true);
    await setDoc(doc(FireStoreDb, 'Verification', id), {
      userId: id,
      step: 1,
      completionRate: handlePercentage(),
      businessInformation: {
        address,
        business_name,
        company_email,
        state,
        lga,
        instagram_username,
        isPhysical,
        opening_hours,
        services,
        whatsapp_number,
        phone,
        website,
        twitter_username,
      }
    });
    setStage(0);
    setSaving(false);
    navigation.navigate('profile');
  }

  const header = React.useCallback(() => {
    switch(stage) {
      case 0:
        return 'Business Information'
      case 1:
        return 'Services'
      case 2:
        return 'Opening Hours'
      case 3:
        return 'Address'
      case 4:
        return 'Contact Information'
      default:
        return 'Business Information'
    
    }
  }, [stage]);

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
              <View style={{ height: '63%', width: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: 20, paddingHorizontal: 20, justifyContent: 'space-between' }}>
                <View flexDirection={'row'}>
                  {stage > 0 && <Feather name='chevron-left' size={30} color='white' onPress={handleBack} />}
                  <Text variant='subheader' color='white'>{header()}</Text>
                </View>

                <Text variant='subheader' color='white' onPress={saving ? undefined : handleSave}>{saving ? 'Saving...' : 'Save & quit'}</Text>
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