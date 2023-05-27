import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { View, Text, CustomButton } from '../..';
import ModalWrapper from '../../ModalWrapper';
import { Feather } from '@expo/vector-icons'
import { useProfileState } from '../../../screens/Dashboardtabs/profile/state';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native-ui-lib';
interface IProps {
    onClose: () => void;
}

const CreateBusinessModal = ({ onClose }: IProps) => {
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);
    const { setShowModal } = useProfileState((state) => state);

    const navigation = useNavigation<any>();

    React.useEffect(() => {
        bottomsheetRef.current?.present();
    });

    const handlePress = React.useCallback(() => {
      setShowModal(false);
      navigation.navigate('createbusinessprofile')
    }, []);
  return (
    <ModalWrapper
        ref={bottomsheetRef}
        onClose={() => onClose()}
        snapPoints={['50%']}
    >
        <View style={{ flex: 1, padding: 0 }}>
          <Text variant='subheader'>Set up Business Profile</Text>
          <Text variant='body'>To access business tools we need you to provide some information about your business</Text>

          <View marginTop='l' style={{ flexDirection: 'row', alignItems: 'center'}}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'black' }} />
            <Text variant='body' marginLeft='m'>Provide Business information</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'black' }} />
            <Text variant='body' marginLeft='m'>Verify your business</Text>
          </View>
          <View height={20} />
          <CustomButton onPress={handlePress} backgroundColor={Colors.brandColor} label='Get started' />

          <Text variant='body' color='brandColor' textAlign='center' marginTop='m' onPress={()=> setShowModal(false)}>Cancel</Text>
        </View>
    </ModalWrapper>
  )
}

export default CreateBusinessModal