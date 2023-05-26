import React from 'react'
import { View, Text } from '../../../../components'
import ModalWrapper from '../../../../components/ModalWrapper'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Pressable, Alert } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useEditBasicState } from '../state';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import mime from "mime";
import { useMutation, useQueryClient } from 'react-query';
import httpClient from '../../../../utils/axios';
import url from '../../../../utils/url';
import { useDetails } from '../../../../State/Details';
import { useNavigation } from '@react-navigation/native';
import handleToast from '../../../../hooks/handleToast';



interface IProps {
  }

  const Item = ({ header, label, icon, action }: {
    header: string,
    label: string,
    icon: JSX.Element,
    action: () => void,
  }) => {
    return (
        <Pressable onPress={action} style={{ width: '100%', flexDirection: 'row' }}>
            <View style={{ marginTop: 5 }}>
            {icon}
            </View>
            <View style={{ marginLeft: 20}}>
                <Text variant='subheader'>{header}</Text>
                <Text variant='body'>{label}</Text>
            </View>
        </Pressable>
    )
  }
const SelectModal = () => {
    const { ShowToast } = handleToast()
    const queryClient = useQueryClient();
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);
    const { id, setState } = useDetails((state) => state)
    const { setPickerModal, setAvatarModal, setAvatar, setFile, setAvatarUploading, setShowTaost } = useEditBasicState((state) => state);

    React.useEffect(() => {
        bottomsheetRef.current?.present();
    })

    const handleOpenAvatarModal = () => {
        setPickerModal(false);
        setAvatarModal(true);
    };

    const pickImage = async () => {
      setAvatarUploading(true);
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          // aspect: [16, 3],
          quality: 1,
        });

        // let result = await DocumentPicker.getDocumentAsync({
        //   type: 'image/*',
        // })

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
          setAvatar(uri);
          setFile(bk);
          setPickerModal(false);

          const formData = new FormData();
          
          
          formData.append('profilepic', bk);
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
            setAvatarUploading(false);
            ShowToast({ message: `Error ${json['message']}`, preset: 'failure' });

          } else {
            setAvatar(url);
            setState({ profilePicture: url  })
            queryClient.invalidateQueries();
            setAvatarUploading(false);
            setPickerModal(false);
            ShowToast({ message: 'Avatar updated successfully', preset: 'success' });
          }
        }
    
        if (result.canceled) {
            Alert.alert('Warning', "action cancelled")
        }
      };

  return (
    <ModalWrapper 
        ref={bottomsheetRef}
        onClose={() => setPickerModal(false)}
        snapPoints={['30%']}
    >
        <Item header='Select from Gallary' label='Choose your photo from your gallary' icon={<Feather name='image' size={25} color='grey' />} action={pickImage} />
        <View style={{ height: 30 }} />
        <Item header='Use an avatar' label='Show your style using an Avatar' icon={<Ionicons name='person-circle-outline' size={25} color='grey' />} action={handleOpenAvatarModal} />

    </ModalWrapper>
  )
}

export default SelectModal