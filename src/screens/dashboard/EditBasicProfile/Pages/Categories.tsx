import React from 'react'
import { Colors } from 'react-native-ui-lib';
import { ActivityIndicator, Pressable, ScrollView, TextInput, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useDetails } from '../../../../State/Details';
import { useAccountSetupState } from '../../CreateBusinessProfile/BusinessInformation/state';
import { useMutation, useQuery } from 'react-query';
import httpClient from '../../../../utils/axios';
import { View, Text, CustomButton } from '../../../../components';
import { Chip } from '../../../../components/Authentication/accountSetup/BusinessChip';
import { CategoryModel, ServiceModel } from '../../../../models/CategoryModel';
import { useNavigation } from '@react-navigation/native';
import handleToast from '../../../../hooks/handleToast';



const Categories = () => {
    const navigation = useNavigation();
    const { ShowToast } = handleToast()
    const { id } = useDetails((state) => state)
    const [interests, setInterests] = React.useState<string[]>([])
    const [search, setSearch] = React.useState('')
    const { isLoading, data } = useQuery(['getBusinesses'], () => httpClient.get('/category'));
    const {} = useQuery(['getUser', id], () => httpClient.get(`/user/${id}`), {
      onSuccess: (data: any) => {
        setInterests(data.data.data.interests);
      }
    });

     // mutation
     const { isLoading: mutaionLoading, mutate } = useMutation({
      mutationFn: (data: any) => httpClient.post(`/service/add/${id}`, data),
      onError: (error: string) => {
        ShowToast({ message: `Error: ${error}`, preset: 'failure' });
    },
      onSuccess: (data) => {
        ShowToast({ message: `${data.data.message}`, preset: 'success' });
        navigation.goBack();
      }
  })


    const handleAddservice  = React.useCallback((id: string) => {
        if (!interests.includes(id)) {
            setInterests([...interests, id]);
            return;
        } else if (interests.includes(id)) {
            setInterests(interests.filter((item) => item !== id))
        } else {
            Alert.alert('Warning', 'You can only select 3 services');
        }
    }, [interests])


    const handleSubmit = React.useCallback(() => {
        if (interests.length < 1) {
            Alert.alert('Warning', 'You must select at least one interest');
            return;
        }
        mutate({ interests })
    }, [interests])

  return (
    <View style={{ flex: 1, paddingBottom: 20 }}>
        <Text variant='subheader'>Categories/services you liked</Text>
        <Text variant='body'>Search category/services</Text>

        {/* SEARCH BAR */}

        <View style={{ width: '100%', height: 55, flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
            <TextInput style={{ flex: 1 }} placeholder='Search categories'  value={search} onChangeText={(e: string) => setSearch(e)} />
            <Feather name='search' size={25} color='grey' />
        </View>

        <View style={{ flex: 1,marginTop: 20 }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100}}>
            {isLoading && <ActivityIndicator size='large' color={Colors.brandColor} />}
               <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
               {!isLoading && data?.data !== undefined && (data.data.data as Array<CategoryModel>).filter((item) => {
                    if (search === '') {
                        return item;
                    } else if (item.category.toLowerCase().includes(search.toLowerCase())){
                        return item;
                    }
                }).sort().map((item, index) => (
                   <View style={{ margin: 10 }} key={index}>
                     <Chip onPress={() => handleAddservice(item.category)} label={item.category} checked={interests.includes(item.category)}  />
                   </View>
                ))}
               </View>
            </ScrollView>
        </View>

        <CustomButton label='Update' onPress={handleSubmit} backgroundColor='black'  />

    </View>
  )
}

export default Categories