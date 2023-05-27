import React from 'react'
import { useAccountSetupState } from '../state'
import { View, Text, CustomButton } from '../../../../components';
import Button from '../../../../components/generalComponents/Button';
import { Colors } from 'react-native-ui-lib';
import { ActivityIndicator, Alert, Pressable, ScrollView, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Image } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import httpClient from '../../../../utils/axios';
import { BusinessModel } from '../../../../models/BusinessModel';
import BusinessChip from '../../../../components/Authentication/accountSetup/BusinessChip';
import { useDetails } from '../../../../State/Details';

const Business = () => {
    const { stage, fullname, setPickerModal, avatar, setStage, businesses, addBusiness } = useAccountSetupState((state) => state);
    const { id } = useDetails((state) => state)
    const [search, setSearch] = React.useState('')
    const [ids, setIds] = React.useState<string[]>([]);
    const { isLoading, data } = useQuery(['getBusinesses'], () => httpClient.get('/business'));

    // mutation
    const { isLoading: mutaionLoading, mutate } = useMutation({
        mutationFn: (data: any) => httpClient.post(`/user/follow-companies/${id}`, data),
        onError: (error: string) => {
            Alert.alert('Error', error);
        },
        onSuccess: () => {
            setStage(stage + 1);
        }
    })

    const handleAddBusiness = React.useCallback((id: string) => {
        if (ids.includes(id)) {
            setIds(ids.filter((item) => item !== id));
            return;
        }
        setIds([...ids, id]);
    }, [ids]);

    const handleSubmit = React.useCallback(() => {
        if (ids.length < 1) {
            Alert.alert('Warning', 'You must select at least one business');
            return;
        }
        const data = {
            company_ids: ids,
        }
        mutate(data);
    }, [ids])
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
        <Text variant='subheader'>Suggested business profile</Text>
        <Text variant='body'>Like at least 3 business pages</Text>

        {/* SEARCH BAR */}

        <View style={{ width: '100%', height: 55, flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
            <TextInput style={{ flex: 1, fontFamily: 'satoshi-regular' }} placeholder='Search for business' value={search} onChangeText={(e: string) => setSearch(e)} />
            <Feather name='search' size={25} color='grey' />
        </View>

        <View style={{ flex: 1,marginTop: 20 }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100}}>
                {isLoading && <ActivityIndicator size='large' color={Colors.brandColor} />}
                {!isLoading && data?.data !== undefined && (data.data.data as Array<BusinessModel>).filter((item) => {
                    if (search === '') {
                        return item;
                    } else if (item.business_name.toLowerCase().includes(search.toLowerCase())){
                        return item;
                    }
                }).map((item, index) => (
                    <BusinessChip onSelect={handleAddBusiness} details={item} key={index} checked={ids.includes(item.id)} />
                ))}
            </ScrollView>
        </View>

        <CustomButton label='Next' onPress={handleSubmit} backgroundColor={Colors.brandColor} isLoading={mutaionLoading}  />

        <Text variant='xs' textAlign='center' marginTop='m' onPress={() => setStage(stage + 1)} color='brandColor' >Skip for now</Text>
    </View>
  )
}

export default Business