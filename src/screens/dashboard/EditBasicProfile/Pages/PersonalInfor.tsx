import React from 'react'
import { View, Text } from '../../../../components'
import { CustomTextInput, SubmitButton } from '../../../../components/form'
import useForm from '../../../../hooks/useForm'
import { basicPersonalInfo } from '../../../../Services/validation'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useDetails } from '../../../../State/Details'
import { useMutation, useQueryClient } from 'react-query'
import httpClient from '../../../../utils/axios'
import { Alert } from 'react-native'
import { query } from 'firebase/firestore'


const PersonalInfor = () => {
  const { fullName, username, id } = useDetails((state) => state);
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (data: any) => httpClient.put(`/user/${id}`, data),
    onError: (error: any) => {
      Alert.alert('Error', error)
    },
    onSuccess: (data) => {
      Alert.alert('Success', data.data.message);
      queryClient.invalidateQueries();
    }
  })
  const { renderForm } = useForm({
    defaultValues: {
      fullName: fullName,
      username: username,
    },
    validationSchema: basicPersonalInfo,
  })
  return renderForm(
    <View flex={1} paddingBottom='m'>
      <View flex={1}>
        <CustomTextInput name='fullName' placeholder='Fullname' leftIcon={<Ionicons name='person-outline' size={25} />} />

        <View height={20} />

        <CustomTextInput name='username' placeholder='Username' leftIcon={<Ionicons name='person-circle-outline' size={25} />} />
      </View>

      <SubmitButton label='Update' onSubmit={(data) => mutate(data)} isLoading={isLoading} />
    </View>
  )
}

export default PersonalInfor