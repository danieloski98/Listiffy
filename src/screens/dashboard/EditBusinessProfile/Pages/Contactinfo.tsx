import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Alert } from 'react-native';
import { CustomButton, View, Text } from '../../../../components';
import { CustomInput } from '../../../../components/TextInput';
import httpClient from '../../../../utils/axios';
import { useNavigation } from '@react-navigation/native';
import { useDetails } from '../../../../State/Details';
import { useEditBusinessState } from '../state'


const Contact = () => {
  const { business_name, services, opening_hours, address, isPhysical, state, lga, company_email, instagram_username, phone, twitter_username, whatsapp_number, website, setCompanyEmail, setPhone, setInstagramUsername, setTwitterUsername, setWhatsappNumber, setWebsite } = useEditBusinessState((state) => state);
  const { setState, id } = useDetails((state) => state);
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();

  const {} = useQuery(['getBusiness', id], () => httpClient.get(`/business/${id}`), {
    onSuccess: (data) => {
      console.log(data.data.data);
      setCompanyEmail(data?.data.data.company_email);
      setPhone(data?.data.data.phone);
      setInstagramUsername(data?.data.data.instagram_username);
      setTwitterUsername(data?.data.data.twitter_username);
      setWhatsappNumber(data?.data.data.whatsapp_number);
      setWebsite(data?.data.data.website);
    }
  })
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) => httpClient.put(`/business/${id}`, data),
    onError: (error: any) => {
      Alert.alert('Error', error);
    },
    onSuccess: async () => {
      Alert.alert('Success', 'Contact Updated');
      queryClient.invalidateQueries('getBusiness');
    }
  })

  const handlePress = () => {
    const obj = {
      company_email,
      phone,
      instagram_username,
      twitter_username,
      whatsapp_number,
      website,
    }
    console.log(obj)
    mutate(obj);
  }
  return (
    <View style={{ flex: 1, paddingBottom: 20 }}>
      <View style={{ flex: 1 }}>
        <Text variant='subheader'>Add your contact information</Text>
        <Text variant='body'>Select how you want your customers to reach out to you</Text>
        {/* SPACER */}
        <View style={{ height: 20 }} />

        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
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
