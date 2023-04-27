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


const Front = () => {
    const { setStage, stage, docType, docNumber, setDocNumber, setFront, front } = useDocState((state) => state);
   
    const pickImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({
          type: 'image/*',
        })

        if (result.type === "success") {
          console.log(result);
          setFront(result as any);
        }
    
        if (result.type === 'cancel') {
            Alert.alert('Warning', "action cancelled")
        }
      };

    const handlePress = React.useCallback(() => {
       
    }, []);
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flex: 1 }}>
        <Text variant='subheader'>Upload front of {docType}</Text>
        <Text variant='body'>Make sure the picture is clear and not blur</Text>
        {/* SPACER */}
        <View style={{ height: 20 }} />

        <Pressable onPress={pickImage} style={{ backgroundColor: '#E1FFEB', height: 200, width: '100%', borderRadius: 15, borderWidth: 2, borderColor: Colors.brandColor, borderStyle: 'dashed' }}>
            {front.uri === '' && 
            <View flex={1} justifyContent={'center'} alignItems={'center'}>
                <Ionicons name='cloud-upload-outline' size={35} />
                <Text variant='body'>Tap to upload</Text>
            </View>}
            {
                front.uri !== '' &&
                (
                    <View flexDirection={'row'} padding='m' alignItems='center' flex={1} width='100%' justifyContent='space-between'>
                        <Text variant='body'>{front.name}</Text>
                        <Ionicons name='trash-outline' size={30} color='red' onPress={() => setFront({
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

      <CustomButton label='next' onPress={() => setStage(stage + 1)} disabled={front.uri === ''} />
    </View>
  )
}

export default Front
