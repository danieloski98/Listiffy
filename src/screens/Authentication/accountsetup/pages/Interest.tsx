import React from 'react'
import { useAccountSetupState } from '../state'
import { View, Text } from '../../../../components';
import Button from '../../../../components/generalComponents/Button';
import { Colors } from 'react-native-ui-lib';
import { ActivityIndicator, Pressable, ScrollView, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Image } from 'react-native';
import { useQuery } from 'react-query';
import httpClient from '../../../../utils/axios';
import { Chip } from '../../../../components/Authentication/accountSetup/BusinessChip';
import { CategoryModel } from '../../../../models/CategoryModel';

const Interest = () => {
    const { stage, setStage, interests, addInterest } = useAccountSetupState((state) => state);
    const [search, setSearch] = React.useState('')
    const { isLoading, data } = useQuery(['getBusinesses'], () => httpClient.get('/category'));

    console.log(data?.data);

    const handleAddBusiness = React.useCallback((id: string) => {
        addInterest(id);
    }, [])

  return (
    <View style={{ flex: 1, padding: 20 }}>
        <Text variant='subheader'>Pick your interests</Text>
        <Text variant='body'>Follow at least 3 categories of your choice </Text>

        {/* SEARCH BAR */}

        <View style={{ width: '100%', height: 55, flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
            <TextInput style={{ flex: 1 }} placeholder='Search category'  value={search} onChangeText={(e: string) => setSearch(e)} />
            <Feather name='search' size={25} color='grey' />
        </View>

        <View style={{ flex: 1,marginTop: 20 }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100}}>
            {isLoading && <ActivityIndicator size='large' color={Colors.brandColor} />}
               <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
               {!isLoading && data?.data !== undefined && (data.data.data as Array<CategoryModel>).filter((item) => !interests.includes(item.id)).filter((item) => {
                    if (search === '') {
                        return item;
                    } else if (item.category.toLowerCase().includes(search.toLowerCase())){
                        return item;
                    }
                }).sort().map((item, index) => (
                   <View style={{ margin: 10 }} key={index}>
                     <Chip onPress={() => handleAddBusiness(item.id)} label={item.category}  />
                   </View>
                ))}
               </View>
            </ScrollView>
        </View>

        <Button label='Done' onPress={() => setStage(stage + 1)} backgroundColor='black' />

    </View>
  )
}

export default Interest