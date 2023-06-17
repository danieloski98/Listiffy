import React from 'react'
import { View, Text } from '../../../../components'
import useForm from '../../../../hooks/useForm'
import { CustomTextInput, SubmitButton } from '../../../../components/form';
import { Feather, Ionicons } from '@expo/vector-icons';
import { fullnameSchema } from '../../../../Services/validation';
import { useAccountSetupState } from '../state';
import { useMutation } from 'react-query';
import httpClient from '../../../../utils/axios';
import { useDetails } from '../../../../State/Details';
import { Alert } from 'react-native/';

const Fullname = () => {
    const { setFullname, setStage, stage, fullname } = useAccountSetupState((state) => state);
    const { setState, id } = useDetails((state) => state)
    const { renderForm } = useForm({
        validationSchema: fullnameSchema,
        defaultValues: {
            fullname: fullname,
        }
    });

    const { isLoading, mutate } = useMutation({
      mutationFn: (data: { fullName: string}) => httpClient.put(`/user/${id}`, data),
      onError: (error: any) => {
        Alert.alert('Error', error)
      },
      onSuccess: () => {
        setStage(stage + 1);
      }
    })

    const handlePress = React.useCallback((data: { fullname: string}) => {
        setFullname(data.fullname);
        mutate({ fullName: data.fullname });
    }, []);
  return renderForm(
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flex: 1 }}>
        <Text variant='medium'>What’s your full name?</Text>
        <Text variant='body'>This helps us to identify you</Text>

        {/* SPACER */}
        <View style={{ height: 20 }} />

        <CustomTextInput name='fullname' placeholder='Fullname' leftIcon={<Ionicons name='person-circle-outline' size={25} color='black'  />} />
      </View>
      <SubmitButton label='Next' onSubmit={handlePress} isLoading={isLoading} />
    </View>
  )
}

export default Fullname