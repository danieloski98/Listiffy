import React from 'react'
import { View, Text } from '../../../components'
import { Feather } from '@expo/vector-icons'
import { ActivityIndicator, Alert, ImageBackground, Pressable, useWindowDimensions } from 'react-native'
import { useDetails } from '../../../State/Details'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors, Dash } from 'react-native-ui-lib'
import { useQuery, useQueryClient } from 'react-query'
import httpClient from '../../../utils/axios'
import * as ImagePicker from 'expo-image-picker';
import mime from "mime";
import url from '../../../utils/url'



const EditBusinessProfile = ({ navigation }: { navigation: any }) => {
  const { profilePicture, fullName, username, id } = useDetails((state) => state);
  const [pic, setPic] = React.useState('');
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(['getBusiness', id], () => httpClient.get(`/business/${id}`), {
    onSuccess: (data) => {
      setPic(data.data.data.logo);
    }
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [16, 3],
      quality: 1,
    });


    if (!result.canceled) {
        const uri = result.assets[0].uri;
        const newBackUri =  "file://" + uri.split("file:///").join("");
        const bk: any = {
      uri,
      type: mime.getType(newBackUri),
      name: uri.split("/").pop()
      // size: result.assets[0].fileSize,
    }
      console.log(result);
      
      setPic(uri);
      

      const formData = new FormData();
      
      
      formData.append('logo', bk);
      const fet = await fetch(`${url}/business/update-logo/${id}`, {
        method: 'put',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const json = await fet.json();

      if (fet.status === 400) {
        Alert.alert('Error', json['message']);
      } else {
        queryClient.invalidateQueries();
      }
    }

    if (result.canceled) {
        Alert.alert('Warning', "action cancelled")
    }
  };

  console.log(data?.data);
  const { width } = useWindowDimensions()
  return (
    <View flex={1}>
      <View flexDirection='row' height={100} alignItems='center'>
        <Feather onPress={() => navigation.goBack()} name='chevron-left' size={24} color='black' />
        <Text variant='body'>Edit Business Profile</Text>
      </View>

      {isLoading && (
        <View flex={1} alignItems='center'>
          <ActivityIndicator color={Colors.brandColor} size='large' />
        </View>
      )}

     { !isLoading && !error && (
       <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
       <View paddingHorizontal='m'>
         <ImageBackground source={pic !== '' ? { uri: pic }: require('../../../../assets/appicon.png')} style={{ width: 100, height: 100, overflow: 'hidden', borderRadius: 20 }}>
           <Pressable onPress={pickImage}  style={{ backgroundColor: 'rgba(0, 0, 0, 0.308)', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
             <Feather name='camera' size={25} color="white"  />
           </Pressable>
         </ImageBackground>
       </View>

       <View flexDirection='row' justifyContent='space-between' paddingHorizontal='m' marginTop='m'>
         <Text variant='body'>PERSONNAL INFORMATION</Text>
         <Feather name='edit-2' size={20} color='grey' onPress={() => navigation.navigate('editbusiness', { name: 'personal'})} />
       </View>

       <View paddingHorizontal='m' marginTop='l'>
         <Text variant='body'>Business Name</Text>
         <Text variant='xs'>{data?.data.data.business_name || 'Not Avaliable'}</Text>
       </View>

       <View paddingHorizontal='m' marginTop='m'>
         <Text variant='body'>Username</Text>
         <Text variant='xs'>@{data?.data.data.business_name || 'Not Avaliable'}</Text>
       </View>

       <View paddingHorizontal='m' marginTop='m'>
         <Text variant='body'>Bio</Text>
         <Text variant='xs'>{data?.data.data.business_description || 'Not Avaliable'}</Text>
       </View>


       <Dash vertical={false} style={{ width: '100%', marginVertical: 20 }} thickness={1} length={width} color='grey' />

       <View height={20} />

       <View style={{ width: '100%' }} paddingHorizontal='m' marginTop='l' flexDirection='row' justifyContent='space-between' alignItems='center'>
         <View>
           <Text variant='body'>Services</Text>
           <View flexDirection='row' flexWrap='wrap' style={{ width: '100%'}}>
           {(data?.data.data.services as Array<string>).map((item, index) => <Text variant='xs' key={index}>{item}, </Text>)}
           </View>
         </View>

         <Feather name='edit-2' size={20} color='grey' onPress={() => navigation.navigate('editbusiness', { name: 'services'})} />
       </View>

       <Dash vertical={false} style={{ width: '100%', marginVertical: 20 }} thickness={1} length={width} color='grey' />

       <View height={20} />

       <View style={{ width: '100%' }} paddingHorizontal='m' marginTop='l' flexDirection='row' justifyContent='space-between' alignItems='center'>
         <View>
           <Text variant='body'>Business Address</Text>
           <Text variant='xs'>Set your business address</Text>
         </View>

         <Feather name='edit-2' size={20} color='grey' onPress={() => navigation.navigate('editbusiness', { name: 'address'})} />
       </View>

       <Dash vertical={false} style={{ width: '100%', marginVertical: 20 }} thickness={1} length={width} color='grey' />

       <View height={20} />

       <View style={{ width: '100%' }} paddingHorizontal='m' marginTop='l' flexDirection='row' justifyContent='space-between' alignItems='center'>
         <View>
           <Text variant='body'>Contact information</Text>
           <Text variant='xs'>Set your Contact Details</Text>
         </View>

         <Feather name='edit-2' size={20} color='grey' onPress={() => navigation.navigate('editbusiness', { name: 'contact'})} />
       </View>

       <Dash vertical={false} style={{ width: '100%', marginVertical: 20 }} thickness={1} length={width} color='grey' />
       


     </ScrollView>
     )}
    </View>
  )
}

export default EditBusinessProfile