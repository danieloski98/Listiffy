import { StyleSheet } from 'react-native'
import React from 'react'
import { View, Text } from '../../../'
import ModalWrapper from '../../../ModalWrapper'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Feather } from '@expo/vector-icons'
import useForm from '../../../../hooks/useForm'
import { Colors } from 'react-native-ui-lib'
import handleToast from '../../../../hooks/handleToast'
import { CustomTextInput, SubmitButton } from '../../../form'
import { CustomInput } from '../../../TextInput'
import { commentSchema, verifyPinSchema } from '../../../../Services/validation'
import { useDetails } from '../../../../State/Details'
import { useMutation, useQueryClient } from 'react-query'
import httpClient from '../../../../utils/axios'
import { useFeedsState } from '../../../../screens/Dashboardtabs/feeds/state'


interface IProps {
    onClose: () => void
    verify: (data: any) => void 
    isLoading: boolean
}

const ReviewModal: React.FC<IProps> = ({ onClose, verify, isLoading }) => {
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);

    const { renderForm, values } = useForm({
        defaultValues: {
            pin: ''
        },
        validationSchema: verifyPinSchema,
    });

    React.useEffect(() => {
        bottomsheetRef.current?.present();
    });

    const handleSubmit = React.useCallback((data: { pin: string}) => {
        verify(data);
    }, [])

  
  return renderForm(
    <ModalWrapper
        ref={bottomsheetRef}
        onClose={() => {}}
        snapPoints={['45%']}
        shouldScrroll={true}
    >
        <View style={{ flex: 1 }}>

            <View style={styles.mainarea}>
                <Text variant='medium'>Verify Review</Text>
                <Text variant='body' marginTop='m'>Enter PIN that was shared to you by Vently Inc . learn more</Text>
                <View height={20} />
                <CustomTextInput leftIcon={<Feather name='key' size={25} color='grey' />} name='pin' placeholder={`Enter Business PIN`} />
                <View height={20} />
                <SubmitButton label="Verify" onSubmit={handleSubmit} isLoading={isLoading} />
                <Text variant='xs' textAlign='center' color='brandColor' marginTop='m' onPress={() => onClose()}>Cancel</Text>
            </View>

            
        </View>
    </ModalWrapper>
  )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        height: '9%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mainarea: {
        flex: 1,
        marginBottom: 20,
        justifyContent: 'center',
    },
    imageContainer: {
        width: '100%',
        marginVertical: 10,
        flex: 1
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    box: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    borderBox: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: Colors.brandColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#F4F4F4'
    },
    deleteButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'lightgrey',
        position: 'absolute',
        right: -10,
        top: -10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    }
})

export default ReviewModal