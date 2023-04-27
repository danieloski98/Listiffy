import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useAccountSetupState } from '../state';
import { useDetails } from '../../../../../State/Details';
import useForm from '../../../../../hooks/useForm';
import { BusinessnameSchema, contactSchema, fullnameSchema } from '../../../../../Services/validation';
import { View, Text } from '../../../../../components';
import { CustomTextInput, SubmitButton } from '../../../../../components/form';
import { ScrollView } from 'react-native-gesture-handler';
import { useMutation } from 'react-query';
import httpClient from '../../../../../utils/axios';
import { Alert } from 'react-native';
import { useVerfificationState } from '../../state';
import { useNavigation } from '@react-navigation/core';

const Contact = () => {
    const { business_name, services, opening_hours, address, isPhysical, state, lga, company_email, instagram_username, phone, twitter_username, whatsapp_number, website } = useAccountSetupState((state) => state);
    const { setStepOneDone } = useVerfificationState((state) => state)
    const { setState, id } = useDetails((state) => state);
    const navigation = useNavigation<any>();
    const { mutate, isLoading } = useMutation({
        mutationFn: (data: any) => httpClient.post(`/business/create-account/${id}`, data),
        onError: (error: any) => {
            Alert.alert('Error', error);
        },
        onSuccess: () => {
            Alert.alert('Success', 'Your business account has been created successfully, now upload your verification documents');
            setStepOneDone(true);
            navigation.navigate("createbusinessprofile");
        }
    })
    const { renderForm } = useForm({
        validationSchema: contactSchema,
        defaultValues: {
            company_email,
            phone,
            instagram_username,
            twitter_username,
            whatsapp_number,
            website,
        }
    });

    const handlePress = React.useCallback((data: any) => {
        console.log(data);
        const obj = {
            ...data,
            business_name,
            services,
            opening_hours,
            address,
            isPhysical,
            state,
            lga
        }
        console.log(obj)
        mutate(obj);
    }, []);
  return renderForm(
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flex: 1 }}>
        <Text variant='subheader'>Add your contact information</Text>
        <Text variant='body'>Select how you want your customers to reach out to you</Text>
        {/* SPACER */}
        <View style={{ height: 20 }} />

        <ScrollView contentContainerStyle={{ paddingBottom: 700 }}>
        <CustomTextInput name='company_email' placeholder='Company email' leftIcon={<Ionicons name='mail-outline' size={25} color='grey'  />} style={{ marginBottom: 20 }} />

            <CustomTextInput name='phone' placeholder='Phone' leftIcon={<Ionicons name='call-outline' size={25} color='grey'  />} style={{ marginBottom: 20 }}  />

            <CustomTextInput name='instagram_username' placeholder='Instagram username' leftIcon={<Ionicons name='logo-instagram' size={25} color='grey'  />} style={{ marginBottom: 20 }}  />

            <CustomTextInput name='twitter_username' placeholder='Twitter username' leftIcon={<Ionicons name='logo-twitter' size={25} color='grey'  />} style={{ marginBottom: 20 }}  />

            <CustomTextInput name='whatsapp_number' placeholder='Whatsapp number' leftIcon={<Ionicons name='logo-whatsapp' size={25} color='grey'  />} style={{ marginBottom: 20 }}  />

            <CustomTextInput name='website' placeholder='Website Address' leftIcon={<Ionicons name='globe-outline' size={25} color='grey'  />} style={{ marginBottom: 20 }}  />
        </ScrollView>

      </View>
      <SubmitButton label='Next' onSubmit={handlePress} isLoading={isLoading} />
    </View>
  )
}

export default Contact
