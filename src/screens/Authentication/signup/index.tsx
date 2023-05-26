import { Alert, Image, StatusBar, } from 'react-native'
import { View, Text, Colors } from 'react-native-ui-lib'
import React from 'react'
import { CustomTextInput, SubmitButton } from '../../../components/form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Feather } from '@expo/vector-icons'
import { useMutation } from 'react-query';

import httpClient from '../../../utils/axios'
import useForm from '../../../hooks/useForm'
import { signupSchema } from '../../../Services/validation'
import { useDetails } from '../../../State/Details'


const Signup = ({ navigation }: any) => {
    // states
    const [showPasword, setShowPassword] = React.useState(false);
    const { setState } = useDetails((state) => state)

    // mutation
    const { isLoading, mutate } = useMutation({ 
        mutationFn: (data: any) => httpClient.post('/user-auth', data),
        onError: (error: any) => {
            Alert.alert('Error', error);
        },
        onSuccess: (data) => {
            setState(data?.data.data);
            navigation.navigate('verifyemail', {email: values()['email']})
        }
    })

    const { renderForm, values } = useForm({
        validationSchema: signupSchema,
        defaultValues: {
            email: '',
            password: '',
            username: '',
        }
    });

    const submit = React.useCallback((data: any) => {
        setState({ ... data });
        mutate(data);
    }, [])

    return renderForm(
         <>
            <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <View style={{ width: '100%', height: '15%', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                    <Image source={require('../../../../assets/images/greenlogo.png')} resizeMode='contain' style={{ height: 30 }} />
                </View>
                <Text header>Get a free Business Profile</Text>
                <Text regular>Create an account using your email address</Text>

                <View style={{ marginTop: 20 }}>
                    <CustomTextInput leftIcon={<Feather name='mail' size={20} color='grey' />} placeholder='Email' name="email" required />
                </View>

                <View style={{ marginTop: 20 }}>
                    <CustomTextInput leftIcon={<Feather name='user' size={20} color='grey' />} placeholder='Username' name="username" required />
                </View>

                <View style={{ marginTop: 20 }}>
                    <CustomTextInput leftIcon={<Feather name='lock' size={20} color='grey' />} rightIcon={<Feather name={showPasword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(prev => !prev)} size={20} color='grey' />} placeholder='Password'  name="password" required isPassword={!showPasword} />
                </View>
                <View>
                    <Text light style={{ marginVertical: 20, fontSize: 12 }}>By clicking create account, you agree to the company Term of Service and Privacy Policy.</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <SubmitButton label='Create account' onSubmit={submit} isLoading={isLoading} />
                </View>
                <View style={{  marginVertical: 20 }}>
                    <Text onPress={() => navigation.navigate('login')} light style={{ textAlign: 'center'}}>Already have an account ? <Text light style={{ color: Colors.brandColor }}>Login</Text></Text>
                </View>
            </View>
        </>
    )
}

export default Signup