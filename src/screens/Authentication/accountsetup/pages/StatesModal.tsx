import React from 'react'
import { View, Text } from '../../../../components'
import ModalWrapper from '../../../../components/ModalWrapper'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Feather } from '@expo/vector-icons';
import Avatars from './Avatars';
import { useAccountSetupState } from '../state';
import EditAvatar from './EditAvatar';
import { IState } from '../../../../models/State.model';
import { ILga } from '../../../../models/Lga.Model';
import { ActivityIndicator, Pressable } from 'react-native';
import { Colors } from 'react-native-ui-lib';

interface IProps {
    type: number;
    data: Array<IState | ILga>;
    onPress: (data: IState | ILga) => void;
    isLoading: boolean;
    onClose: () => void;
}

const StateModal = ({ type, data, onPress, isLoading, onClose }: IProps) => {
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);

    React.useEffect(() => {
        bottomsheetRef.current?.present();
    });


  return (
    <ModalWrapper
        ref={bottomsheetRef}
        onClose={() => onClose()}
        snapPoints={['70%']}
    >
        <View style={{ flex: 1, padding: 0 }}>
            {
                isLoading && <ActivityIndicator color={Colors.brandColor} size='large' />
            }
            {
                type === 1 && !isLoading && data !== undefined && (data as Array<IState>).sort((a: IState, b: IState) => {
                    if (a.name > b.name) {
                        return 1;
                    } else {
                        return -1;
                    }
                }).map((item, inx) => (
                    <Pressable key={inx} onPress={() => onPress(item)} style={{ width: '100%', height: 60, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'lightgrey'}}>
                        <Text variant='body'>{item.name}</Text>
                    </Pressable>
                ))
            }
            {
                type === 2 && !isLoading && data !== undefined && (data as Array<ILga>).sort((a: ILga, b: ILga) => {
                    if (a.LGA > b.LGA) {
                        return 1;
                    } else {
                        return -1;
                    }
                }).map((item, inx) => (
                    <Pressable key={inx} onPress={() => onPress(item)} style={{ width: '100%', height: 60, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'lightgrey'}}>
                        <Text variant='body'>{item.LGA}</Text>
                    </Pressable>
                ))
            }
        </View>
    </ModalWrapper>
  )
}

export default StateModal