import React from 'react'
import { useAccountSetupState } from '../state'
import { View, Text, CustomButton } from '../../../../components';
import Button from '../../../../components/generalComponents/Button';
import { Colors } from 'react-native-ui-lib';
import { ActivityIndicator, Pressable, ScrollView, TextInput, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Image } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import httpClient from '../../../../utils/axios';
import { Chip } from '../../../../components/Authentication/accountSetup/BusinessChip';
import { CategoryModel } from '../../../../models/CategoryModel';
import { useDetails } from '../../../../State/Details';

const Interest = () => {
    const { stage, setStage, interests, addInterest } = useAccountSetupState((state) => state);
    const { id } = useDetails((state) => state)
    const [search, setSearch] = React.useState('')
    const { isLoading, data } = useQuery(['getBusinesses'], () => httpClient.get('/category'));

     // mutation
     const { isLoading: mutaionLoading, mutate } = useMutation({
        mutationFn: (data: any) => httpClient.post(`/service/add/${id}`, data),
        onError: (error: string) => {
            Alert.alert('Error', error);
        },
        onSuccess: () => {
            setStage(stage + 1);
        }
    })

    const handleAddBusiness = React.useCallback((id: string) => {
        if (interests.includes(id)) {
            return;
        }
        addInterest(id);
    }, [])


    const handleSubmit = React.useCallback(() => {
        if (interests.length < 1) {
            Alert.alert('Warning', 'You must select at least one interest(s)');
            return;
        }
        const data = {
            interests,
        }
        mutate(data);
    }, [interests])

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
        <Text variant='subheader'>Pick your interests</Text>
        <Text variant='body'>Follow at least 3 categories of your choice </Text>

        {/* SEARCH BAR */}

        <View style={{ width: '100%', height: 55, flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
            <TextInput style={{ flex: 1, fontFamily: 'satoshi-regular' }} placeholder='Search category'  value={search} onChangeText={(e: string) => setSearch(e)} />
            <Feather name='search' size={25} color='grey' />
        </View>
        <Text variant='body' mt='s'>{interests.length} interestes selected</Text>

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
                     <Chip onPress={() => handleAddBusiness(item.category)} label={item.category} checked={interests.includes(item.category)}  />
                   </View>
                ))}
               </View>
            </ScrollView>
        </View>

        <CustomButton label='Done' onPress={handleSubmit} backgroundColor={Colors.brandColor} isLoading={mutaionLoading}  />

    </View>
  )
}

export default Interest