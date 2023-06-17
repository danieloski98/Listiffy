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
import { commentSchema } from '../../../../Services/validation'
import { useDetails } from '../../../../State/Details'
import { useMutation, useQueryClient } from 'react-query'
import httpClient from '../../../../utils/axios'
import { useFeedsState } from '../../../../screens/Dashboardtabs/feeds/state'


interface IProps {
    onClose: () => void
}

const CommentModal: React.FC<IProps> = ({ onClose }) => {
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);
    const { username, id } = useDetails((state) => state);
    const { activePostId, setAll } = useFeedsState((state) => state);
    const { ShowToast } = handleToast();
    const queryClient = useQueryClient();

    const { isLoading, mutate } = useMutation({
        mutationFn: (data: any) => httpClient.put(`/post/comment/${id}`, data),
        onError: (error: any) => {
            ShowToast({ message: error, preset: 'failure' });
        },
        onSuccess: (data) => {
            ShowToast({ message: data.data.message, preset: 'success' });
            queryClient.refetchQueries();
            onClose()
        }
    })

    const { renderForm, values } = useForm({
        defaultValues: {
            comment: ''
        },
        validationSchema: commentSchema,
    });

    React.useEffect(() => {
        bottomsheetRef.current?.present();
    });

    const handleSubmit = React.useCallback((data: { comment: string}) => {
        const dataload = { ...data, postId: activePostId }
        mutate(dataload);
    }, [])

  

  return renderForm(
    <ModalWrapper
        ref={bottomsheetRef}
        onClose={() => {}}
        snapPoints={['25%']}
        shouldScrroll={false}
    >
        <View style={{ flex: 1 }}>

            <View style={styles.mainarea}>
                <CustomTextInput leftIcon={<></>} name='comment' placeholder={`comment as ${username}`} />
                <View height={20} />
                <SubmitButton label="Submit" onSubmit={handleSubmit} isLoading={isLoading} />
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

export default CommentModal