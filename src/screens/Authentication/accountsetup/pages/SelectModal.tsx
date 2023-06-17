import React from 'react'
import { View, Text } from '../../../../components'
import ModalWrapper from '../../../../components/ModalWrapper'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Pressable, Alert } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useAccountSetupState } from '../state';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';


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
                <Text variant='medium'>{header}</Text>
                <Text variant='body'>{label}</Text>
            </View>
        </Pressable>
    )
  }
const SelectModal = () => {
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);
    const { setPickerModal, setAvatarModal, setAvatar, setFile } = useAccountSetupState((state) => state)

    React.useEffect(() => {
        bottomsheetRef.current?.present();
    })

    const handleOpenAvatarModal = () => {
        setPickerModal(false);
        setAvatarModal(true);
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        // let result = await ImagePicker.launchImageLibraryAsync({
        //   mediaTypes: ImagePicker.MediaTypeOptions.All,
        //   allowsEditing: true,
        //   // aspect: [16, 3],
        //   quality: 1,
        // });

        let result = await DocumentPicker.getDocumentAsync({
          type: 'image/*',
        })

        if (result.type === "success") {
          console.log(result);
          setAvatar(result.uri);
          setFile(result);
          setPickerModal(false);
        }
    
        if (result.type === 'cancel') {
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