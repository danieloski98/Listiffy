import { Image, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { View, Text, CustomButton } from '../../../components'
import { Feather } from '@expo/vector-icons'
import { Rating } from 'react-native-ratings';
import { useDetails } from '../../../State/Details';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Colors } from 'react-native-ui-lib';
import * as ImagePicker from 'expo-image-picker';
import { ImageContainer } from '../../../components/dashboardtabs/Feeds/Modals/CreatePost';
import mime from "mime";
import handleToast from '../../../hooks/handleToast';
import { useMutation, useQueryClient } from 'react-query';
import httpClient from '../../../utils/axios';
import ReviewModal from '../../../components/dashboardtabs/Feeds/Modals/Review';




const WriteReview = ({ navigation, route }: any) => {
    const { params: { id: businessId } } = route
    const { ShowToast } = handleToast();
    const [rating, setRating] = React.useState(0);
    const { profilePicture, id } = useDetails((state) => state);
    const [images, setImages] = React.useState<ImagePicker.ImagePickerAsset[]>([]);
    const [comment, setComment] = React.useState('');
    const [showmodal, setShowmodal] = React.useState(false);
    const queryClient = useQueryClient();

    const { isLoading, mutate } = useMutation({
        mutationFn: (data: FormData) => httpClient.post(`/review/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }),
        onError: (error: any) => {
            ShowToast({ message: error, preset: 'failure' });
        },
        onSuccess: (data) => {
            ShowToast({ message: data.data.message, preset: 'success' });
            queryClient.refetchQueries();
            setShowmodal(false);
            navigation.goBack();
        }
    })

    const handleDelete = React.useCallback((index: number) => {
        images.splice(index, 1);
        setImages([...images])
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

    const handleSubmit = React.useCallback((data: { pin: string}) => {
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
            formData.append('pic', bk);
        });
        formData.append('review', 'hello there people');
        formData.append('pin', data.pin);
        formData.append('rating', rating.toString());
        formData.append('businessId', businessId);
        
        console.log(formData);
        mutate(formData);
    }, [images, comment, rating, businessId]);

    const handleReview = React.useCallback(() => {
        if (images.length < 1) {
            ShowToast({ message: 'you must upload at least one image', preset: 'general'});
            return;
        }
        if (comment === '') {
            ShowToast({ message: 'you must write a comment', preset: 'general'});
            return;
        }
        setShowmodal(true);
    }, [comment, images])

  return (
    <View flex={1} backgroundColor='white'>
        <View style={{ height: '12%'}} flexDirection='row' paddingHorizontal='m' alignItems='flex-end' paddingBottom='l'>
            <Feather onPress={() => navigation.goBack()} name='chevron-left' size={25} color='grey' style={{ marginTop: 10 }} />
            <Text variant='body'>Write a review</Text>
         </View>
      <ScrollView style={{ flex: 1, padding: 20, }} contentContainerStyle={{ paddingBottom: 50 }}>
        <Text variant='medium'>Rate this business</Text>

        <View flexDirection='row' alignItems='center'>
        <Rating
            type='star'
            ratingCount={5}
            fractions={1}
            startingValue={rating}
            imageSize={25}
            showRating={false}
            ratingBackgroundColor='lightgrey'
            onStartRating={(val: number) => setRating(val)}
            onFinishRating={(val: number) => setRating(val)}
            ratingColor='lightgrey'
            style={{ paddingVertical: 10, backgroundColor: 'white', alignItems: 'flex-start', marginLeft: 0, }}
          />
          <Text variant='body' marginLeft='m'>{rating} stars</Text>
        </View>

        <Text variant='medium' marginTop='m'>Comment</Text>

        <View flexDirection='row' borderWidth={1} style={{ borderColor: '#DFE1E8' }} borderRadius={12} padding='m' height={110}>
            <Image source={{ uri: profilePicture }} style={{ width: 50, height: 50, borderRadius: 25 }} />
            <TextInput value={comment} onChangeText={(e) => setComment(e)} multiline numberOfLines={3} style={{ flex: 1, marginLeft: 10 }} cursorColor={Colors.brandColor} textAlignVertical='top' />
        </View>

        <Text variant='medium'  marginTop='l'>Add Images</Text>
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
      </ScrollView>

      <View height={120} width='100%' justifyContent='center' paddingHorizontal='m'>
        <CustomButton label='Leave review' onPress={handleReview} />
      </View>
      {showmodal && <ReviewModal onClose={() => setShowmodal(false)} isLoading={isLoading} verify={handleSubmit} />}
    </View>
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

export default WriteReview