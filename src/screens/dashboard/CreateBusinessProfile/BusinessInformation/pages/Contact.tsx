import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useAccountSetupState } from '../state';
import { useDetails } from '../../../../../State/Details';
import useForm from '../../../../../hooks/useForm';
import { BusinessnameSchema, contactSchema, fullnameSchema } from '../../../../../Services/validation';
import { View, Text, CustomButton } from '../../../../../components';
import { SubmitButton } from '../../../../../components/form';
import { ScrollView } from 'react-native-gesture-handler';
import { useMutation } from 'react-query';
import httpClient from '../../../../../utils/axios';
import { Alert } from 'react-native';
import { useVerfificationState } from '../../state';
import { useNavigation } from '@react-navigation/core';
import { doc, setDoc } from "firebase/firestore";
import { FireStoreDb } from '../../../../../firebase';
import { CustomInput } from '../../../../../components/TextInput';

const Contact = () => {
  const { business_name, services, opening_hours, address, isPhysical, state, lga, company_email, instagram_username, phone, twitter_username, whatsapp_number, website, setCompanyEmail, setPhone, setInstagramUsername, setTwitterUsername, setWhatsappNumber, setWebsite } = useAccountSetupState((state) => state);
  const { setState, id } = useDetails((state) => state);
  const navigation = useNavigation<any>();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) => httpClient.post(`/business/create-account/${id}`, data),
    onError: (error: any) => {
      Alert.alert('Error', error);
    },
    onSuccess: async () => {
      await setDoc(doc(FireStoreDb, 'Verification', id), {
        step: 2,
        completionRate: 0,
        businessInformation: {
          address,
          business_name,
          company_email,
          state,
          lga,
          instagram_username,
          isPhysical,
          opening_hours,
          services,
          whatsapp_number,
          phone,
          website,
          twitter_username,
        }
      });
      Alert.alert('Success', 'Your business account has been created successfully, now upload your verification documents');
      navigation.navigate("createbusinessprofile");
    }
  })

  const handlePress = React.useCallback(() => {
    const obj = {
      company_email,
      phone,
      instagram_username,
      twitter_username,
      whatsapp_number,
      website,
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
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flex: 1 }}>
        <Text variant='subheader'>Add your contact information</Text>
        <Text variant='body'>Select how you want your customers to reach out to you</Text>
        {/* SPACER */}
        <View style={{ height: 20 }} />

        <ScrollView contentContainerStyle={{ paddingBottom: 700 }}>
          <CustomInput value={company_email} onChangeText={setCompanyEmail} placeholder='Company email' leftIcon={<Ionicons name='mail-outline' size={25} color='grey' />} />
          <View height={20} />
          <CustomInput value={phone} onChangeText={setPhone} placeholder='Phone' leftIcon={<Ionicons name='call-outline' size={25} color='grey' />} />
          <View height={20} />
          <CustomInput value={instagram_username} onChangeText={setInstagramUsername} placeholder='Instagram username' leftIcon={<Ionicons name='logo-instagram' size={25} color='grey' />} />
          <View height={20} />
          <CustomInput value={twitter_username} onChangeText={setTwitterUsername} placeholder='Twitter username' leftIcon={<Ionicons name='logo-twitter' size={25} color='grey' />} />
          <View height={20} />
          <CustomInput value={whatsapp_number} onChangeText={setWhatsappNumber} placeholder='Whatsapp number' leftIcon={<Ionicons name='logo-whatsapp' size={25} color='grey' />} />
          <View height={20} />
          <CustomInput value={website} onChangeText={setWebsite} placeholder='Website Address' leftIcon={<Ionicons name='globe-outline' size={25} color='grey' />} />
        </ScrollView>

      </View>
      <CustomButton label='Next' onPress={handlePress} isLoading={isLoading} />
    </View>
  )
}

export default Contact
