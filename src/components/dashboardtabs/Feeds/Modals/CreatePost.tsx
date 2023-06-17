import { Alert, ImageBackground, Pressable, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { View, Text, CustomButton } from '../../../'
import ModalWrapper from '../../../ModalWrapper'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import useForm from '../../../../hooks/useForm'
import { CustomTextAreaInput } from '../../../form/TextArea'
import * as ImagePicker from 'expo-image-picker';
import { Colors } from 'react-native-ui-lib'
import { ScrollView } from 'react-native-gesture-handler'
import handleToast from '../../../../hooks/handleToast'
import { SubmitButton } from '../../../form'
import mime from "mime";

// Image container

export const ImageContainer = ({
    uri,
    index,
    deleteItem
}: {
    uri: string,
    index: number,
    deleteItem: () => void
}) => {
    return (
        <View style={{ zIndex: 2,marginRight: 10 }}>
            <View style={[styles.image, { overflow: 'hidden', marginBottom: 20, alignSelf: 'auto', zIndex: 1 }]}>
                <ImageBackground source={{ uri: uri }} style={[ StyleSheet.absoluteFill, styles.image]}>
                    
                </ImageBackground>
            </View>
            <Pressable onPress={() => deleteItem()} style={styles.deleteButton}>
                <Feather name='x' size={10} color='black' />
            </Pressable>
        </View>
    )
}

interface IProps {
    onClose: () => void
    submit: (data: FormData) => void
}

const CreatePost: React.FC<IProps> = ({ onClose, submit }) => {
    const [isDrafts, setIsDrafts] = React.useState(false);
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);
    const [images, setImages] = React.useState<ImagePicker.ImagePickerAsset[]>([]);
    const { ShowToast } = handleToast()

    const { renderForm, values } = useForm({
        defaultValues: {
            description: ''
        }
    });

    React.useEffect(() => {
        bottomsheetRef.current?.present();
    });

    const handleCancel = React.useCallback(() => {
        Alert.alert('Discard Post', 'Are you sure you don’t to save this post?', [
            {
                text: 'Save as draft',
                style: 'default',
                onPress: () => handleSaveasDrafts(values()),
            },
            {
                text: 'Discard',
                style: 'destructive',
                onPress: () => {
                    onClose();
                }
            },
        ])
    }, [images]);

    const handlePicker = React.useCallback(async() => {
        if (images.length === 5) {
            ShowToast({ message: 'You can\'t pick more than 5 images'})
            return;
        }
        const Result = await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: false,
            allowsEditing: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            selectionLimit: 5,
            presentationStyle: ImagePicker.UIImagePickerPresentationStyle.POPOVER,
        });

        if (!Result.canceled) {
            Result.assets.map((image: ImagePicker.ImagePickerAsset) => {
                setImages([...images, image])
            })
        } else {
            return;
        }
    }, [images]);

    const handleDelete = React.useCallback((index: number) => {
        images.splice(index, 1);
        setImages([...images])
    }, [images]);

    const handleSubmit = React.useCallback((data: { description: string}) => {
        if (images.length < 1) {
            ShowToast({ message: 'Please select at least 1 image', preset: 'general'});
            return;
        }
        const formData = new FormData();
        images.map((item) => {
            const newBackUri =  "file://" + item.uri.split("file:///").join("");
            const bk: any = {
                uri: item.uri,
                type: mime.getType(newBackUri),
                name: item.uri.split("/").pop()
                // size: result.assets[0].fileSize,
            }
            formData.append('files', bk);
        });
        formData.append('post', data.description);
        formData.append('isDraft', 'false');
        submit(formData);
        onClose();
    }, [images, isDrafts]);

    const handleSaveasDrafts = (data: any) => {
        setIsDrafts(true);
        if (images.length === 0) {
            ShowToast({ message: 'Please select at least 1 image', preset: 'general'});
            return;
        }
        const formData = new FormData();
        images.map((item) => {
            const newBackUri =  "file://" + item.uri.split("file:///").join("");
            const bk: any = {
                uri: item.uri,
                type: mime.getType(newBackUri),
                name: item.uri.split("/").pop()
            }
            formData.append('files', bk);
        });
        formData.append('post', data.description);
        formData.append('isDraft', 'true');
        submit(formData);
        onClose();
    };

  return renderForm(
    <ModalWrapper
        ref={bottomsheetRef}
        onClose={() => {}}
        snapPoints={['85%']}
        shouldScrroll={false}
    >
        <View style={{ flex: 1 }}>
            {/* HEADER */}
            <View style={styles.header}>
                <Feather name='chevron-left' size={30} onPress={handleCancel} />
                <Text variant='medium'>Create Post</Text>
                <Text variant='medium' style={{ color: 'red' }} onPress={handleCancel}>Cancel</Text>
            </View>

            <View style={styles.mainarea}>
                <View>
                    <Text variant='medium'>Add images</Text>
                    <Text variant='body'>you can add up to 5 images</Text>
                </View>

                <View style={[styles.imageContainer]}>
                    {
                        images.length < 1 && (
                            <View style={styles.box}>
                                     <Pressable style={styles.borderBox} onPress={handlePicker}>
                                         <Feather name='camera' size={25} color={Colors.brandColor} />
                                     </Pressable>
                            </View>
                        )
                    }
                   <ScrollView style={{ flex: 1 }} contentContainerStyle={[ { flexDirection: 'row', flexWrap: 'wrap', justifyContent: images.length < 1 ? 'flex-start':'flex-start', paddingVertical: 20 }]}>
                   {
                        images.length > 0 && images.map((item, index) => (
                           <ImageContainer key={index} index={index} uri={item.uri} deleteItem={() => handleDelete(index)} />
                        ))
                    }
                    {
                        images.length > 0 && (
                            <View style={styles.box}>
                                <Pressable style={styles.borderBox} onPress={handlePicker}>
                                    <Feather name='camera' size={25} color={Colors.brandColor} />
                                </Pressable>
                            </View>
                        )
                    }
                   </ScrollView>
                </View>

                <View flexDirection='row' alignItems='center'>
                    <Text variant='medium' marginBottom='s'>Write description</Text>
                    <Feather name='help-circle' size={20} color='black' style={{ marginLeft: 10 }} />
                </View>

                <CustomTextAreaInput name='description' placeholder='Write something...' />
                <Text variant='xs' marginTop='s'>Tips: you may use hashtags</Text>
            </View>

            <SubmitButton label="Publish Post" onSubmit={handleSubmit} isLoading={false} />
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
        flex: 0.95,
        marginBottom: 20,
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

export default CreatePost