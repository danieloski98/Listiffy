import React from 'react'
import { useAccountSetupState } from '../state'
import { View, Text } from '../../../../components';
import Button from '../../../../components/generalComponents/Button';
import { Colors } from 'react-native-ui-lib';
import { Alert, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Image } from 'react-native';
import { useMutation } from 'react-query';
import httpClient from '../../../../utils/axios';
import { useDetails } from '../../../../State/Details';
import url from '../../../../utils/url';

const Picture = () => {
    const { stage, fullname, setPickerModal, avatar, setStage, file } = useAccountSetupState((state) => state);
    const { id, setState } = useDetails((state) => state);

    // mutation
    const uploadLink = useMutation({
      mutationFn: (data: FormData| any) => httpClient.put(`/user/profilepic/link/${id}`, data),
      onError: (error: string) => {
        Alert.alert('Error', error);
      },
      onSuccess: (data) => {
        console.log(data.data);
        setStage(stage + 1);
      }
    })
    const { isLoading, mutate } = useMutation({
      mutationFn: (data: FormData) => httpClient.put(`/user/profilepic/${id}`, data),
      onError: (error: string) => {
        Alert.alert('Error', error);
      },
      onSuccess: (data) => {
        console.log(data.data);
        setStage(stage + 1);
      }
    })
    const handleImageUpload = React.useCallback(async() => {
      
      if (avatar.startsWith('http')) {
        uploadLink.mutate({ avatar });
        return;
      } else {
          const formData = new FormData();
          delete file['type'];
          const obj: any = {
            uri: file.uri,
            type: file.mimeType,
            name: file.name,
            // size: file.size
          }
          formData.append('profilepic', obj);
          const fet = await fetch(`${url}/user/profilepic/${id}`, {
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
            setStage(stage + 1);
          }
          // mutate(formData);
          // return;
      }
    }, [avatar, file]);
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <Text variant='medium'>Set a profile picture</Text>
        <Text variant='body'>Show your style using a pitcure or avatar</Text>

        {/* SPACER */}
        <View style={{ height: 20 }} />

        <View style={{ width: '100%', height: 150, alignItems: 'center'}}>
            <View style={{ width: 150, height: 150, borderRadius: 100, borderStyle: 'dashed', borderWidth: 1, borderColor: Colors.brandColor, padding: 10 }}>
                {avatar === '' && (
                    <Pressable onPress={() => setPickerModal(true)} style={{ width: '100%', height: '100%', borderRadius: 100, backgroundColor: '#E1FFEB', justifyContent: 'center', alignItems: 'center' }}>
                        <Feather name='camera' size={25} color='black' />
                    </Pressable>
                )}
                {avatar !== '' && (
                    <Pressable onPress={() => setPickerModal(true)} style={{ width: '100%', height: '100%', borderRadius: 100, backgroundColor: '#E1FFEB', overflow: 'hidden', }}>
                        <Image source={{ uri: avatar }} resizeMode='cover' style={{ width: '100%', height: '100%'}} />
                    </Pressable>
                )}
            </View>
        </View>

        
      </View>
      {avatar !== '' && <Button label='Next' onPress={handleImageUpload} backgroundColor={Colors.brandColor} />}
    </View>
  )
}

export default Picture