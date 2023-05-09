import React from 'react'
import { View, Text } from '../../../../components'
import ModalWrapper from '../../../../components/ModalWrapper'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Feather } from '@expo/vector-icons';
import EditAvatar from '../../../Authentication/accountsetup/pages/EditAvatar';
import Avatars from './Avatars';
import { useEditBasicState } from '../state';


const AvatarModal = () => {
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);
    const { setAvatarModal } = useEditBasicState((state) => state)

    const [page, setPage] = React.useState(1);
    const [image, setImage] = React.useState('');

    React.useEffect(() => {
        bottomsheetRef.current?.present();
    });

    const handlePageChange = React.useCallback(() => {
        if (page === 1) {
            return <Avatars />
        } 
        if (page === 2) {
            return <EditAvatar />
        }
    }, [page])

  return (
    <ModalWrapper
        ref={bottomsheetRef}
        onClose={() => setAvatarModal(false)}
        snapPoints={['70%']}
    >
        <View style={{ flex: 1, padding: 0 }}>
            {page === 2 && (
                <View style={{ width: '100%', height: 30 }}>
                    <Feather name='chevron-left' size={25} color='black' />
                </View>
            )}
            {handlePageChange()}
        </View>
    </ModalWrapper>
  )
}

export default AvatarModal