import React from 'react'
import { Feather } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useRoute } from '@react-navigation/native'
import OTPTextInput from 'react-native-otp-textinput';
import CustomButton from '../../../components/generalComponents/Button'
import httpClient from '../../../utils/axios'
import { Alert } from 'react-native'
import { useMutation } from 'react-query'
import { useStageStore } from '../changepassword/state'
import { View, Text } from '../../../components';

interface IProps {
    navigation?: NativeStackNavigationProp<any>;
}

const VerifyEmail = ({ navigation }: IProps) => {
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState(false);
  const [showCounter, setShowCounter] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const ref = React.useRef();
  const increase = useStageStore((state) => state.increase)
    const route = useRoute();
    const { email } = route.params as any

        // mutation
        const { mutate: verifyCode, isLoading: verifyCodeLoading } = useMutation({
          mutationFn: (code: string) => httpClient.get(`/user-auth/verify/${code}`),
          onSuccess: (data) => {
              console.log(data.data);
              navigation?.navigate('setup');
          },
          onError: (error: any) => {
              console.log(error);
              Alert.alert('Error', error);
              setError(true);
          }
      });
  
      const { mutate } = useMutation({
          mutationFn: (email: string) => httpClient.get(`/user-auth/resend-verification-code/${email}`),
          onSuccess: (data) => {
              console.log(data.data);
              Alert.alert('Error', data.data.message);
          },
          onError: (error: any) => {
              console.log(error);
              Alert.alert('Error', error.message)
          }
      });

      const handleShowcounter = React.useCallback(() => {
        if (!showCounter) {
            setShowCounter(true);
            mutate(email);
            setSeconds(59);
            const interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(prev => prev - 1);
                    return;
                } else {
                    setSeconds(0);
                    setShowCounter(false);
                    clearInterval(interval);
                }
            }, 1000)
        }
    }, []);

    const verify = React.useCallback(() => {
        setError(false);
        verifyCode(code);
    }, [code])
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ height: '15%', justifyContent: 'center' }}>
        <Feather name='chevron-left' size={25} color='black' onPress={() => navigation?.goBack()} />
      </View>
      <Text variant='subheader'>Verify your email address</Text>
      <Text variant='body'>We sent a 6 digit code to {email || ''}</Text>

      {/* <TextInput keyboardType='phone-pad' /> */}
    
    <OTPTextInput 
        inputCount={6} 
        ref={ (e: any) => (ref.current = e)} 
        handleTextChange={(text: string) => setCode(text)}
        keyboardType="phone-pad"
        containerStyle={{
            marginVertical: 10
        }} 
        textInputStyle={{
            borderRadius: 10,
            borderWidth: 0,
            backgroundColor: 'lightgrey',
            flex: 1
        }}
    />

    {error && <Text variant='xs' style={{ color: 'red' }} marginBottom='m' textAlign='left'>{'invalid code'}</Text>}

    <Text variant='body' color='brandColor' marginBottom='m' textAlign='center' onPress={handleShowcounter}>{showCounter ? seconds: 'Resend code'}</Text>

    <CustomButton label='Verify' backgroundColor='black' textColor='white' borderRadius={5} size='large' onPress={verify} disabled={code.length < 6}  />
    </View>
  )
}

export default VerifyEmail