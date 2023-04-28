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
import { doc, setDoc } from "firebase/firestore"; 
import { FireStoreDb } from '../../../../firebase'
import { useDetails } from '../../../../State/Details'

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

const Verification = ({ navigation }: IProps) => {
  // zustand state
  const { stage, setStage, docNumber, docType, front, back } = useDocState((state) => state);
  const { id } = useDetails((state) => state);

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
      step: 2,
      completionRate: handlePercentage(),
      verificationDocument: {
        docNumber,
        docType,
        front,
        back,
      }
    });
    setStage(0);
    setSaving(false);
    navigation.navigate('profile');
  }

  const header = React.useCallback(() => {
   if (stage === 0) {
    return 'Verify Identity';
   } else {
    return 'Upload Document';
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
   
          {
            stage < 4 && (
                <View style={{ height: '20%', width: '100%', backgroundColor: Colors.brandColor }}>
                    <ImageBackground source={require('../../../../../assets/images/meshbackground.png')} resizeMode='cover' style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
                    <View style={{ height: '63%', width: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: 20, paddingHorizontal: 20, justifyContent: 'space-between' }}>
                      <View flexDirection={'row'}>
                        {stage > 0 && <Feather name='chevron-left' size={30} color='white' onPress={handleBack} />}
                        <Text variant='subheader' color='white'>{header()}</Text>
                      </View>

                      <Text variant='subheader' color='white' onPress={saving ? undefined : handleSave}>{saving ? 'Saving...' : 'Save & quit'}</Text>
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