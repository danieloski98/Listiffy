import React from 'react'
import { View, Text } from '../../../../components'
import useForm from '../../../../hooks/useForm'
import { resetEmailSchema } from '../../../../Services/validation';
import { CustomTextInput, SubmitButton } from '../../../../components/form';
import { Feather, Ionicons } from '@expo/vector-icons'
import { useStageStore } from '../state'
import { useMutation } from 'react-query';
import httpClient from '../../../../utils/axios';
import { Alert } from 'react-native';


const EmailPage = () => {
    const increase = useStageStore((state) => state.increase);
    const setEmail = useStageStore((state) => state.setEmail)
    const { renderForm, values } = useForm({
        validationSchema: resetEmailSchema,
        defaultValues: {
            email: ''
        }
    });
    // mutation
    const { mutate, isLoading } = useMutation({
        mutationFn: (email: string) => httpClient.get(`/user-auth/reset-password-code/${email}`),
        onSuccess: (data) => {
            console.log(data.data);
            setEmail(values()['email']);
            increase(1)
        },
        onError: (error: any) => {
            console.log(error);
            Alert.alert('Error', error.message)
        }
    });

    const handlePress = React.useCallback((data: { email: string}) => {
        mutate(data.email);
    }, [])
  return renderForm(
    <View style={{ flex: 1, paddingTop: 20 }}>
      <Text variant='subheader'>Recover your account</Text>
      <Text variant='xs'>We’ve got your back. Enter your username and we’ll send you a code to your email or phone number access your account</Text>

      <View style={{ marginVertical: 20 }}>
        <CustomTextInput style={{ marginTop: 20 }} name='email' leftIcon={<Ionicons name="person-circle-outline" size={25} color='grey' />} placeholder='Email' />
      </View>

      <SubmitButton label='Send Code' onSubmit={handlePress} isLoading={isLoading} />

    </View>
  )
}

export default EmailPage