import React from 'react'
import { View, Text } from '../../../../components'
import useForm from '../../../../hooks/useForm'
import { resetEmailSchema, resetPasswordSchema } from '../../../../Services/validation';
import { CustomTextInput, SubmitButton } from '../../../../components/form';
import { Feather, Ionicons } from '@expo/vector-icons'
import { useStageStore } from '../state'
import { useMutation } from 'react-query';
import httpClient from '../../../../utils/axios';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const Setpassword = () => {
    const resetStage = useStageStore((state) => state.resetStage);
    const email = useStageStore((state) => state.email);
    const [showPasword, setShowPassword] = React.useState(false);

    const navigation = useNavigation<any>();

    const { renderForm } = useForm({
        validationSchema: resetPasswordSchema,
        defaultValues: {
            password: ''
        }
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: any) => httpClient.post(`/user-auth/reset-password`, data),
        onSuccess: (data) => {
            resetStage();
            Alert.alert('Success', data.data.message);
            navigation.navigate('login');
        },
        onError: (error: any) => {
            Alert.alert('Error', error)
        }
    });

    const handlePress = React.useCallback((data: { password: string }) => {
        const obj = {
            ...data,
            email
        }
        mutate(obj);
    }, [])
  return renderForm(
    <View style={{ flex: 1, paddingTop: 20 }}>
      <Text variant='subheader'>Set new password</Text>
      <Text variant='xs'>Use of alphanumberic and characters *#! to make your password strong</Text>

      <View style={{ marginVertical: 20 }}>
        <CustomTextInput style={{ marginTop: 20 }} isPassword={showPasword} name='password' leftIcon={<Ionicons name="lock-closed" size={25} color='grey' />} rightIcon={<Feather name={showPasword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(prev => !prev)} size={20} color='grey' />} placeholder='Password' />
      </View>

      <SubmitButton label='Set password' onSubmit={handlePress} isLoading={isLoading} />

    </View>
  )
}

export default Setpassword