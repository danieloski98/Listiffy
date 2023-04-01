import { View, Text, Colors } from 'react-native-ui-lib'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useRoute } from '@react-navigation/native'
import OTPTextInput from 'react-native-otp-textinput';
import CustomButton from '../../../components/generalComponents/Button'

interface IProps {
    navigation?: NativeStackNavigationProp<any>;
}

const VerifyEmail = ({ navigation }: IProps) => {
    const [code, setCode] = React.useState('');
    const ref = React.useRef();
    const route = useRoute();
    const { email } = route.params as any
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ height: '15%', justifyContent: 'center' }}>
        <Feather name='chevron-left' size={25} color='black' onPress={() => navigation?.goBack()} />
      </View>
      <Text header>Verify your email address</Text>
      <Text regular>We sent a 6 digit code to {email || ''}</Text>

      {/* <TextInput keyboardType='phone-pad' /> */}
    
    <OTPTextInput 
        inputCount={6} 
        ref={ (e: any) => (ref.current = e)} 
        handleTextChange={(text: string) => setCode(text)}
        keyboardType="phone-pad"
        containerStyle={{
            marginVertical: 30
        }} 
        textInputStyle={{
            borderRadius: 10,
            borderWidth: 0,
            backgroundColor: 'lightgrey',
            flex: 1
        }}
    />

    <Text regular style={{ color: Colors.brandColor, textAlign: 'center', marginBottom: 20 }}>Resend Code</Text>

    <CustomButton label='Verify' backgroundColor='black' textColor='white' borderRadius={5} size='large' onPress={() => navigation?.navigate('setup')} disabled={code.length < 6}  />
    </View>
  )
}

export default VerifyEmail