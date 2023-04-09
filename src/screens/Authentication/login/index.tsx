import { Alert, Image, StatusBar, } from 'react-native'
import { View, Text, Colors } from 'react-native-ui-lib'
import React from 'react'
import { CustomTextInput, SubmitButton } from '../../../components/form'
import { Feather } from '@expo/vector-icons'
import { useMutation } from 'react-query';

import httpClient from '../../../utils/axios'
import useForm from '../../../hooks/useForm'
import { loginSchema } from '../../../Services/validation'
import { useDetails } from '../../../State/Details'


const Login = ({ navigation }: any) => {
    // states
    const { setState } = useDetails((state) => state);
    const [showPasword, setShowPassword] = React.useState(false);
    const { renderForm } = useForm({
        validationSchema: loginSchema,
        defaultValues: {
            email: '',
            password: '',
        }
    });

    // mutation
    const { isLoading, mutate } = useMutation({ 
        mutationFn: (data: any) => httpClient.post('/user-auth/login', data),
        onError: (error: any) => {
            Alert.alert('Error', error);
            console.log(error.response.data)
        },
        onSuccess: (data) => {
            setState({...data.data.data, loggedIn: true});
        }
    })

    return renderForm(
           <>
             <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <View style={{ width: '100%', height: '15%', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                    <Image source={require('../../../../assets/images/greenlogo.png')} resizeMode='contain' style={{ height: 30 }} />
                </View>
                <Text header>Glad to have you back.</Text>
                <Text regular>Login into your account</Text>

                <View style={{ marginTop: 20 }}>
                    <CustomTextInput leftIcon={<Feather name='mail' size={20} color='grey' />} placeholder='Email' name="email" required />
                </View>

                <View style={{ marginTop: 20 }}>
                    <CustomTextInput leftIcon={<Feather name='lock' size={20} color='grey' />} rightIcon={<Feather name={showPasword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(prev => !prev)} size={20} color='grey' />} placeholder='Password' name="password" required isPassword={!showPasword} />
                </View>
                <View>
                    <Text onPress={() => navigation.navigate('resetpassword')}  light style={{ color: Colors.brandColor, marginVertical: 20 }}>Reset Password</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <SubmitButton label='Login' onSubmit={(data) => mutate(data)} isLoading={isLoading} />
                </View>
                <View style={{  marginVertical: 20 }}>
                    <Text onPress={() => navigation.navigate('signup')} light style={{ textAlign: 'center'}}>New to Listtify ? <Text light style={{ color: Colors.brandColor }}>Create account</Text></Text>
                </View>
            </View>
           </>
    )
}

export default Login