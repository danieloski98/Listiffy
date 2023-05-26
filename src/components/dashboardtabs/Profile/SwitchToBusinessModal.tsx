import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { View, Text, CustomButton } from '../..';
import ModalWrapper from '../../ModalWrapper';
import { Feather } from '@expo/vector-icons'
import { useProfileState } from '../../../screens/Dashboardtabs/profile/state';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useMutation, useQueryClient } from 'react-query';
import httpClient from '../../../utils/axios';
import { useDetails } from '../../../State/Details';
import handleToast from '../../../hooks/handleToast';
interface IProps {
    onClose: () => void;
}

const SwitchBusinessModal = ({ onClose }: IProps) => {
    const { id } = useDetails((state) => state);
    const { ShowToast } = handleToast()
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);
    const { setSwitchModal, setBusiness, isBusiness } = useProfileState((state) => state);

    const queryClient = useQueryClient();

    const { mutate, isLoading: httpLoading } = useMutation({
        mutationFn: () => httpClient.put(`/user/switch-account/${isBusiness ? 'to-user':'to-business'}/${id}`),
        onSuccess: (data) => {
          ShowToast({ message: data.data.message, preset: 'success' });
          setBusiness(!isBusiness);
          queryClient.invalidateQueries();
          setSwitchModal(false);
        },
        onError: (error: any) => {
          ShowToast({ message: error, preset: 'failure' });
        }
      });

    React.useEffect(() => {
        bottomsheetRef.current?.present();
    });

  return (
    <ModalWrapper
        ref={bottomsheetRef}
        onClose={() => onClose()}
        snapPoints={['50%']}
    >
        <View style={{ flex: 1, padding: 0 }}>
          <Text variant='subheader'>Switch Profile</Text>
          {!isBusiness && <Text variant='body'>Switching your profile back to  business will have the following changes</Text>}
          {isBusiness && <Text variant='body'>Switching your profile from business to basic will have the following changes</Text>}


          {!isBusiness && (
            <>
                <View marginTop='l' style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'black' }} />
                    <Text variant='body' marginLeft='m'>Your business will be discovered until you turn it off</Text>
                </View>

                <View marginTop='l' style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'black' }} />
                    <Text variant='body' marginLeft='m'>Customers will be able to contact you</Text>
                </View>

                <View marginTop='l' style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'black' }} />
                    <Text variant='body' marginLeft='m'>You will be able to run ads</Text>
                </View>
            </>
          )}

        {isBusiness && (
            <>
                <View marginTop='l' style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'black' }} />
                    <Text variant='body' marginLeft='m'>Your business will no longer be discovered until you turn it back on</Text>
                </View>

                <View marginTop='l' style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'black' }} />
                    <Text variant='body' marginLeft='m'>Customers won’t be able to contact you</Text>
                </View>

                <View marginTop='l' style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'black' }} />
                    <Text variant='body' marginLeft='m'>You won’t be able to run ads</Text>
                </View>
            </>
          )}

          <View height={20} />
          <CustomButton onPress={mutate} isLoading={httpLoading} label={isBusiness ? 'Switch to Basic' : 'Switch to Business'} />
        </View>
    </ModalWrapper>
  )
}

export default SwitchBusinessModal