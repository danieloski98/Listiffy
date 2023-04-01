import React from 'react'
import { Alert } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { View, Text, CustomButton } from '../../../../components'
import { Colors } from 'react-native-ui-lib';
import { useStageStore } from '../state'
import { useMutation } from 'react-query';
import httpClient from '../../../../utils/axios';



const OTPverification = () => {
    const [code, setCode] = React.useState('');
    const [error, setError] = React.useState(false);
    const [showCounter, setShowCounter] = React.useState(false);
    const [seconds, setSeconds] = React.useState(0);
    const ref = React.useRef();
    const increase = useStageStore((state) => state.increase)
    const email = useStageStore((state) => state.email);

     // mutation
     const { mutate: verifyCode, isLoading: verifyCodeLoading } = useMutation({
        mutationFn: (code: string) => httpClient.get(`/user-auth/verify-password-reset-code/${code}`),
        onSuccess: (data) => {
            console.log(data.data);
            increase(1)
        },
        onError: (error: any) => {
            console.log(error);
            Alert.alert('Error', error);
            setError(true);
        }
    });

    const { mutate } = useMutation({
        mutationFn: (email: string) => httpClient.get(`/user-auth/reset-password-code/${email}`),
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
    <View style={{ flex: 1, paddingTop: 20 }}>
    <Text variant='subheader'>Enter verification code</Text>
    <Text variant='xs'>We sent a 6 digit code to {email}</Text>

    <OTPTextInput 
        inputCount={6} 
        ref={ (e: any) => (ref.current = e)} 
        handleTextChange={(text: string) => setCode(text)}
        keyboardType="phone-pad"
        containerStyle={{
            marginVertical: 20
        }} 
        textInputStyle={{
            borderRadius: 10,
            borderWidth: 0,
            backgroundColor: 'lightgrey',
            borderBottomColor: error ? "red": Colors.brandColor,
            flex: 1
        }}
    />

    {error && <Text variant='xs' style={{ color: 'red' }} marginBottom='m' textAlign='left'>{'invalid code'}</Text>}

    <Text variant='body' color='brandColor' marginBottom='m' textAlign='center' onPress={handleShowcounter}>{showCounter ? seconds: 'Resend code'}</Text>

    <CustomButton isLoading={verifyCodeLoading} label='Verify' backgroundColor='black' color='white' onPress={verify} disabled={code.length < 6} />
   

  </View>
  )
}

export default OTPverification