import { Colors, Wizard, Button } from 'react-native-ui-lib'
import { useWindowDimensions } from 'react-native'
import { useDocState } from './state'

import React from 'react'
import { ImageBackground } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { View, Text } from '../../../../components'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Type  from './pages/Type'
import EnterNumber from './pages/EnterNumber'
import Front from './pages/Front'
import Back from './pages/Back'
import Pending from './pages/Pending'

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

const Verification = ({ navigation }: IProps) => {
  // zustand state
  const setStage = useDocState((state) => state.setStage);
  const { stage } = useDocState((state) => state);

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
   
          {
            stage < 4 && (
                <View style={{ height: '20%', width: '100%', backgroundColor: Colors.brandColor }}>
                    <ImageBackground source={require('../../../../../assets/images/meshbackground.png')} resizeMode='cover' style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
                    <View style={{ height: '63%', width: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: 20, paddingHorizontal: 10 }}>
                        {<Feather name='chevron-left' size={30} color='white' onPress={handleBack} />}
                        <Text variant='subheader' color='white' marginLeft='m'>Verify Identity</Text>
                    </View>
                    </ImageBackground>
                </View>
            )
          }
    
      <View style={{ flex: 1 }}>
        {stage === 0 && <Type />}
        {stage === 1 && <EnterNumber />}
        {stage === 2 && <Front />}
        {stage === 3 && <Back />}
        {stage === 4 && <Pending />}
      </View>

    </GestureHandlerRootView>
  )
}

export default Verification