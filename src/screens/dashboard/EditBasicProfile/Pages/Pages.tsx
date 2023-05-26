import React from 'react'
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
import { useAccountSetupState } from '../../../Authentication/accountsetup/state';
import { useNavigation } from '@react-navigation/native';
import handleToast from '../../../../hooks/handleToast';

const Business = () => {
    const navigation = useNavigation();
    const { ShowToast } = handleToast()
    const { id } = useDetails((state) => state)
    const [ids, setIds] = React.useState<string[]>([]);
    const [search, setSearch] = React.useState('')


    const { isLoading, data } = useQuery(['getBusinesses'], () => httpClient.get('/business'));

    const {  } = useQuery(['getUser', id], () => httpClient.get(`/user/${id}`), {
      onSuccess: (data) => {
        (data.data.data.following as Array<any>).map((item) => {
            setIds([ ...ids, item.company_id]);
        })
        console.log(ids);
      }
    });

    // mutation
    const { isLoading: mutaionLoading, mutate } = useMutation({
        mutationFn: (data: any) => httpClient.post(`/user/follow-companies/${id}`, data),
        onError: (error: string) => {
            ShowToast({ message: `Error: ${error}`, preset: 'failure' });
        },
        onSuccess: (data) => {
            ShowToast({ message: `${data.data.message}`, preset: 'success' });
            navigation.goBack();
        }
    })

    const handleAddBusiness = (id: string) => {
        if (ids.includes(id)) {
            console.log('deleting iid......');
            setIds(ids.filter((item) => item !== id));
        } else {
          setIds([...ids, id]);
          console.log('not included!!!!!')
          console.log(ids)
        }
    };

    const handleSubmit = React.useCallback(() => {
        const data = {
            comapany_ids: ids,
        }
        mutate(data);
    }, [ids])
  return (
    <View style={{ flex: 1, paddingBottom: 20 }}>
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

        <CustomButton label='Update' onPress={handleSubmit} backgroundColor='black' isLoading={mutaionLoading}  />

    </View>
  )
}

export default Business