import React from 'react'
import { View, Text } from '../../../../components'
import { CustomTextInput, SubmitButton } from '../../../../components/form'
import useForm from '../../../../hooks/useForm'
import { basicPersonalInfo, businessInfo } from '../../../../Services/validation'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useDetails } from '../../../../State/Details'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import httpClient from '../../../../utils/axios'
import { Alert } from 'react-native'
import { query } from 'firebase/firestore'
import { CustomTextAreaInput } from '../../../../components/form/TextArea'
import handleToast from '../../../../hooks/handleToast'
import { useNavigation } from '@react-navigation/native'


const PersonalInfo = () => {
  const navigation = useNavigation();
  const { ShowToast } = handleToast();
  const { fullName, username, id } = useDetails((state) => state);
  const queryClient = useQueryClient();
  const { data, isLoading: BLoading } = useQuery(['getBusiness', id], () => httpClient.get(`/business/${id}`))
  const { isLoading, mutate } = useMutation({
    mutationFn: (data: any) => httpClient.put(`/business/${id}`, data),
    onError: (error: any) => {
      ShowToast({ message: 'error', preset: 'failure' });
    },
    onSuccess: (data) => {
      ShowToast({ message: data.data.message, preset: 'success' });
      queryClient.invalidateQueries();
      navigation.goBack();
    }
  })
  const { renderForm } = useForm({
    defaultValues: {
      business_name: BLoading ? '': data?.data.data.business_name,
      business_description: BLoading ? '': data?.data.data.business_description,
    },
    validationSchema: businessInfo,
  })
  return renderForm(
    <View flex={1} paddingBottom='m'>
      <View flex={1}>
        <CustomTextInput name='business_name' contextMenuHidden={true} editable={false} placeholder='Business Name' leftIcon={<Ionicons name='business-outline' size={25} />} />

        <View height={20} />

        <CustomTextAreaInput name='business_description' placeholder='Bio' />
      </View>

      <SubmitButton label='Update Information' onSubmit={(data) => mutate(data)} isLoading={isLoading} />
    </View>
  )
}

export default PersonalInfo