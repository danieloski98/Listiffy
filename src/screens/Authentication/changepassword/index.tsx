import React from 'react'
import { useStageStore } from './state'
import { Styles } from './style'
import { View, Text } from '../../../components'
import { Feather } from '@expo/vector-icons'
import EmailPage from './pages/EmailPage'
import OTPverification from './pages/OTPverification'
import Setpassword from './pages/Setpassword'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface IProps {
    navigation: NativeStackNavigationProp<any>;
}

const RestePassword = ({ navigation }: IProps) => {
    const { stage, decrease } = useStageStore((state) => state)

    const handleBackPress = React.useCallback(() => {
        if (stage === 1) {
            navigation.goBack();
            return;
        } else {
            decrease();
            return;
        }
    }, [stage])
  return (
    <View style={Styles.parent}>
      <View style={Styles.header}>
        <Feather name='chevron-left' size={30} color='black' onPress={handleBackPress} />
      </View>

      <View style={Styles.body}>
        {stage === 1 && <EmailPage />}
        {stage === 2 && <OTPverification />}
        {stage === 3 && <Setpassword />}
      </View>
    </View>
  )
}

export default RestePassword