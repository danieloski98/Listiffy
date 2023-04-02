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
import { BusinessModel } from '../../../../models/BusinessModel';
import BusinessChip from '../../../../components/Authentication/accountSetup/BusinessChip';

const Business = () => {
    const { stage, fullname, setPickerModal, avatar, setStage, businesses, addBusiness } = useAccountSetupState((state) => state);
    const [search, setSearch] = React.useState('')
    const { isLoading, data } = useQuery(['getBusinesses'], () => httpClient.get('/business'));

    const handleAddBusiness = React.useCallback((id: string) => {
        addBusiness(id);
    }, [])
  return (
    <View style={{ flex: 1, padding: 20 }}>
        <Text variant='subheader'>Suggested business profile</Text>
        <Text variant='body'>Like at least 3 business pages</Text>

        {/* SEARCH BAR */}

        <View style={{ width: '100%', height: 55, flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
            <TextInput style={{ flex: 1 }} placeholder='Search for business' value={search} onChangeText={(e: string) => setSearch(e)} />
            <Feather name='search' size={25} color='grey' />
        </View>

        <View style={{ flex: 1,marginTop: 20 }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100}}>
                {isLoading && <ActivityIndicator size='large' color={Colors.brandColor} />}
                {!isLoading && data?.data !== undefined && (data.data.data as Array<BusinessModel>).filter((item) => !businesses.includes(item.id)).filter((item) => {
                    if (search === '') {
                        return item;
                    } else if (item.business_name.toLowerCase().includes(search.toLowerCase())){
                        return item;
                    }
                }).map((item, index) => (
                    <BusinessChip onSelect={handleAddBusiness} details={item} key={index} />
                ))}
            </ScrollView>
        </View>

        <Button label='Next' onPress={() => setStage(stage + 1)} backgroundColor='black' />

        <Text variant='xs' textAlign='center' marginTop='m' onPress={() => setStage(stage + 1)} >Skip for now</Text>
    </View>
  )
}

export default Business