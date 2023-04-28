import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDocState } from '../state';
import { useDetails } from '../../../../../State/Details';
import useForm from '../../../../../hooks/useForm';
import { BusinessnameSchema, docSchema, fullnameSchema } from '../../../../../Services/validation';
import { View, Text, CustomButton } from '../../../../../components';
import { CustomTextInput, SubmitButton } from '../../../../../components/form';
import * as DocumentPicker from 'expo-document-picker';
import { Alert, Pressable } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import url from '../../../../../utils/url';


const Back = () => {
    const { setStage, stage, docType, setBack, back, front, docNumber } = useDocState((state) => state);
    const { id } = useDetails((state) => state);
    const [loading, setLoading] = React.useState(false);
    const pickImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({
          type: 'image/*',
        })

        if (result.type === "success") {
          console.log(result);
          setBack(result as any);
        }
    
        if (result.type === 'cancel') {
            Alert.alert('Warning', "action cancelled")
        }
      };

      const handleImageUpload = React.useCallback(async() => {
            const formData = new FormData();
            const ft: any = {
              uri: front.uri,
              type: front.mimeType,
              name: front.name,
              // size: file.size
            }

            const bk: any = {
                uri: back.uri,
                type: back.mimeType,
                name: back.name,
                // size: file.size
              }
         
            formData.append('front', ft);
            formData.append('back', bk);
            formData.append('document_type', docType);
            formData.append('id_number', docNumber);
            
            setLoading(true);
            const fet = await fetch(`${url}/business/verification-document/${id}`, {
              method: 'post',
              body: formData,
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
  
            const json = await fet.json();
            setLoading(false);
            console.log(url);
            if (fet.status !== 201) {
                console.log(json);
              Alert.alert('Error', json['message']);
            } else {
              setStage(stage + 1);
            }
           
      }, []);
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

      <CustomButton label='Submit' onPress={handleImageUpload} isLoading={loading} disabled={back.uri === ''} />
    </View>
  )
}

export default Back
