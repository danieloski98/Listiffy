import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { View, Text, CustomButton } from '../..';
import ModalWrapper from '../../ModalWrapper';
import { Feather } from '@expo/vector-icons'
import { useProfileState } from '../../../screens/Dashboardtabs/profile/state';
import { useNavigation } from '@react-navigation/native';
import CustomOutlineButton from '../../generalComponents/OutlineButton';
import { useDetails } from '../../../State/Details';
import { useQuery } from 'react-query';
import httpClient from '../../../utils/axios';
import { ActivityIndicator, Share } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import * as Clipboard from 'expo-clipboard';
import { Incubator } from 'react-native-ui-lib'
import handleToast from '../../../hooks/handleToast';

const {Toast} = Incubator;

interface IProps {
    onClose: () => void;
}

const ShowPinModal = ({ onClose }: IProps) => {
    const { ShowToast } = handleToast();
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);
    const { setShowModal } = useProfileState((state) => state);
    const [pin, setPin] = React.useState("");
    const [showToast, setShowToast] = React.useState(false);
    const { id } = useDetails((state) => state)

    const { isLoading, error, refetch } = useQuery(['getpin', id], () => httpClient.get(`/business/pin/${id}`), {
        onSuccess: (data) => {
            console.log(data.data);
            setPin(data.data.data.pin.toString());
        }
    })

    const navigation = useNavigation<any>();

    React.useEffect(() => {
        bottomsheetRef.current?.present();
    });

    const copyToClipboard = React.useCallback( async () => {
        await Clipboard.setStringAsync(pin);
        ShowToast({ message: 'PIN copied', preset: 'success' });
      }, [pin]);

      const share = React.useCallback( async () => {
        const s = await Share.share({ message: pin, title: 'My PIN' });
      }, [pin]);

    const getName = React.useCallback(() => {
        const items = [];
        for(let i = 0; i < pin.length; i++) {
            items.push(pin[i]);
        }
        return items;
    }, [pin])

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
          <Text variant='medium' textAlign='center' style={{ fontFamily: 'satoshi-bold' }}>Share PIN</Text>
          <Text variant='body' textAlign='center'>Share this PIN with your customers so they can leave a business review for you.</Text>

          <View marginTop='l' style={{ flexDirection: 'column', alignItems: 'center'}}>
            {!isLoading && !error && (
                <>
                    <View flexDirection='row' justifyContent='center'>
                        {getName().map((item, index) => (
                            <Text variant='medium' marginHorizontal='s' key={index} style={{ fontFamily: 'satoshi-bold', fontSize: 34 }}>{item}</Text>
                        ))}
                    </View>
                    <Text variant='body' marginLeft='m' marginTop='m' color='brandColor'>Expires after 3 reviews</Text>
                </>
            )}
            {
                !isLoading && error as any && (
                    <Text variant='body' marginLeft='m' style={{ color: 'red' }}>An error occured</Text>
                )
            }
            {
                isLoading && (
                    <ActivityIndicator color={Colors.brandColor} size='large' />
                )
            }
          </View>

          <View height={20} />

          <CustomButton onPress={copyToClipboard} label='Copy PIN' />
          <View height={20} />
          <CustomOutlineButton onPress={share} label='Share PIN' />

        </View>
    </ModalWrapper>
  )
}

export default ShowPinModal