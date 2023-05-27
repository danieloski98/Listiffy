import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDocState } from '../state';
import { useDetails } from '../../../../../State/Details';
import { View, Text, CustomButton } from '../../../../../components';
import * as DocumentPicker from 'expo-document-picker';
import { Alert, Pressable } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import url from '../../../../../utils/url';
import mime from "mime";
import * as ImagePicker from 'expo-image-picker';
import { useMutation } from 'react-query';
import httpClient from '../../../../../utils/axios';


const Back = () => {
    const { setStage, stage, docType, setBack, back, front, docNumber } = useDocState((state) => state);
    const { id } = useDetails((state) => state);
    const [loading, setLoading] = React.useState(false);

    const { mutate, isLoading } = useMutation({
      mutationFn: async (data: any) => fetch(`${url}/business/verification-document/${id}`, {
        body: data,
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }),
      onError: (error: any) => {
        setLoading(true);
        Alert.alert(error)
      },
      onSuccess: () => {
      }
    })
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
        base64: false,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        presentationStyle: ImagePicker.UIImagePickerPresentationStyle.PAGE_SHEET,
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
        setBack(bk);
      } else {
        alert('You did not select any image.');
      }
      };

      const handleImageUpload = async() => {
        setLoading(true);
        const formData = new FormData();
         
            formData.append('front', front as any);
            formData.append('back', back as any);
            formData.append('documentType', docType);
            formData.append('documentNumberr', docNumber);


            const res = await fetch(`${url}/business/verification-document/${id}`, {
              body: formData,
              method: "POST",
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });

            const json = await res.json();
            console.log(json);

            if (!res.ok) {
              setLoading(false);
              Alert.alert('Error', JSON.stringify(json.message));
            } else {
              setLoading(false)
              setStage(stage + 1);
            }
            
      };
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flex: 1 }}>
        <Text variant='subheader'>Upload back of {docType}</Text>
        <Text variant='body'>Make sure the picture is clear and not blur</Text>
        {/* SPACER */}
        <View style={{ height: 20 }} />

        <Pressable onPress={pickImage} style={{ backgroundColor: '#E1FFEB', height: 200, width: '100%', borderRadius: 15, borderWidth: 2, borderColor: Colors.brandColor, borderStyle: 'dashed' }}>
            {back.uri === '' && 
            <View flex={1} justifyContent={'center'} alignItems={'center'}>
                <Ionicons name='cloud-upload-outline' size={35} />
                <Text variant='body'>Tap to upload</Text>
            </View>}
            {
                back.uri !== '' &&
                (
                    <View flexDirection={'row'} padding='m' alignItems='center' flex={1} width='100%' justifyContent='space-between'>
                        <Text variant='body'>{back.name}</Text>
                        <Ionicons name='trash-outline' size={30} color='red' onPress={() => setBack({
            mimeType: '',
            name: '',
            size: 0,
            type: '',
            uri: ''
        })} />
                    </View>
                )
            }
        </Pressable>

        <Text variant='body' mt='s'>Max file size 20mb</Text>

      </View>

      <CustomButton label='Submit' onPress={handleImageUpload} backgroundColor={Colors.brandColor} isLoading={isLoading || loading} disabled={back.uri === ''} />
    </View>
  )
}

export default Back
