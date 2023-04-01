import { View, Text, Colors, Wizard } from 'react-native-ui-lib'
import { useAccountSetupState } from './state'

import React from 'react'
import { ImageBackground } from 'react-native'

const AccountSetup = () => {
    // zustand state
    const stage = useAccountSetupState((state) => state.stage);
  return (
    <View style={{ flex: 1 }}>
     <View style={{ height: '20%', width: '100%', backgroundColor: Colors.brandColor}}>
        <ImageBackground source={require('../../../../assets/images/meshbackground.png')} resizeMode='cover' style={{ height: '100%', width: '100%', justifyContent: 'flex-end' }}>
            <Wizard containerStyle={{ backgroundColor: 'transparent'}}>
                <Wizard.Step state={Wizard.States.ENABLED} label={'Label'} />
                <Wizard.Step state={Wizard.States.ENABLED} label={'Label'} />
                <Wizard.Step state={Wizard.States.ENABLED} label={'Label'} />
                <Wizard.Step state={Wizard.States.ENABLED} label={'Label'} />
            </Wizard>
        </ImageBackground>
     </View>
     <View style={{ flex: 1 }}></View>
    </View>
  )
}

export default AccountSetup