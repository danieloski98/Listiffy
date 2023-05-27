import React from 'react'
import { useAccountSetupState } from '../state'
import { Colors } from 'react-native-ui-lib';
import { ActivityIndicator, Pressable, ScrollView, TextInput, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Image } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { useDetails } from '../../../../../State/Details';
import httpClient from '../../../../../utils/axios';
import { View, Text, CustomButton } from '../../../../../components';
import { Chip } from '../../../../../components/Authentication/accountSetup/BusinessChip';
import { ServiceModel } from '../../../../../models/CategoryModel';


const Services = () => {
    const { stage, setStage, services, setService, removeService } = useAccountSetupState((state) => state);
    console.log(services);
    const { id } = useDetails((state) => state)
    const [search, setSearch] = React.useState('')
    const { isLoading, data } = useQuery(['getBusinesses'], () => httpClient.get('/service'));


    const handleAddservice  = React.useCallback((id: string) => {
        if (!services.includes(id) && services.length < 3) {
            setService(id);
            return;
        } else if (services.includes(id)) {
            removeService(services.filter((item) => item !== id))
        } else {
            Alert.alert('Warning', 'You can only select 3 services');
        }
    }, [services])


    const handleSubmit = React.useCallback(() => {
        if (services.length < 1) {
            Alert.alert('Warning', 'You must select at least one service(s)');
            return;
        }
       setStage(stage + 1);
    }, [services])

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
        <Text variant='subheader'>What services do you render?</Text>
        <Text variant='body'>you can pick up to 3 services</Text>

        {/* SEARCH BAR */}

        <View style={{ width: '100%', height: 55, flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
            <TextInput style={{ flex: 1, fontFamily: 'satoshi-regular' }} placeholder='Search services'  value={search} onChangeText={(e: string) => setSearch(e)} />
            <Feather name='search' size={25} color='grey' />
        </View>

        <Text variant='body'>{services.length} Selected</Text>

        <View style={{ flex: 1,marginTop: 20 }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100}}>
            {isLoading && <ActivityIndicator size='large' color={Colors.brandColor} />}
               <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
               {!isLoading && data?.data !== undefined && (data.data.data as Array<ServiceModel>).filter((item) => {
                    if (search === '') {
                        return item;
                    } else if (item.service.toLowerCase().includes(search.toLowerCase())){
                        return item;
                    }
                }).sort().map((item, index) => (
                   <View style={{ margin: 10 }} key={index}>
                     <Chip onPress={() => handleAddservice(item.service)} label={item.service} checked={services.includes(item.service)}  />
                   </View>
                ))}
               </View>
            </ScrollView>
        </View>

        <CustomButton label='Next' onPress={handleSubmit} backgroundColor={Colors.brandColor}  />

    </View>
  )
}

export default Services