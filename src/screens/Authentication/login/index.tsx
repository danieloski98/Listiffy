import { Alert, Image, StatusBar, } from 'react-native'
import { View, Text, Colors } from 'react-native-ui-lib'
import React from 'react'
import { CustomTextInput, SubmitButton } from '../../../components/form'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Feather } from '@expo/vector-icons'
import { useMutation } from 'react-query';

import * as yup from 'yup';
import httpClient from '../../../utils/axios'

const validationSchema = yup.object().shape({
    email: yup.string().required('Your email is required').email('Invalid email'),
    password: yup.string().required('Your password is required'),
});

const Login = () => {
    // states
    const [showPasword, setShowPassword] = React.useState(false);

    // mutation
    const { isLoading, mutate } = useMutation({ 
        mutationFn: (data: any) => httpClient.post('/user-auth/login', data),
        onError: (error: any) => {
            Alert.alert('Error', error.response.data.message);
            console.log(error.response.data)
        },
        onSuccess: (data) => {
            console.log(data.data);
        }
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    return (
         <FormProvider {...methods}>
            <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <View style={{ width: '100%', height: '15%', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                    <Image source={require('../../../../assets/images/greenlogo.png')} resizeMode='contain' style={{ height: 30 }} />
                </View>
                <Text header>Glad to have you back.</Text>
                <Text regular>Login into your account</Text>

                <View style={{ marginTop: 20 }}>
                    <CustomTextInput leftIcon={<Feather name='user' size={20} color='grey' />} placeholder='Email' control={methods.control} name="email" required />
                </View>

                <View style={{ marginTop: 20 }}>
                    <CustomTextInput leftIcon={<Feather name='lock' size={20} color='grey' />} rightIcon={<Feather name={showPasword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(prev => !prev)} size={20} color='grey' />} placeholder='Password' control={methods.control} name="password" required isPassword={!showPasword} />
                </View>
                <View>
                    <Text light style={{ color: Colors.brandColor, marginVertical: 20 }}>Reset Password</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <SubmitButton label='Login' onSubmit={(data) => mutate(data)} isLoading={isLoading} />
                </View>
                <View style={{  marginVertical: 20 }}>
                    <Text light style={{ textAlign: 'center'}}>New to Listtify ? <Text light style={{ color: Colors.brandColor }}>Create account</Text></Text>
                </View>
            </View>
        </FormProvider>
    )
}

export default Login