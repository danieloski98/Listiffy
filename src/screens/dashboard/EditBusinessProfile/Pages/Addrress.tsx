import React from 'react'
import { Feather, Ionicons } from '@expo/vector-icons';
import { useEditBusinessState } from '../state';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ActivityIndicator, Alert } from 'react-native';
import { Checkbox, Colors } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { useDetails } from '../../../../State/Details';
import httpClient from '../../../../utils/axios';
import { IState } from '../../../../models/State.model';
import { ILga } from '../../../../models/Lga.Model';
import { CustomButton, View, Text } from '../../../../components';
import { CustomInput } from '../../../../components/TextInput';
import { CustomSelect } from '../../../../components/form';
import StateModal from '../../../Authentication/accountsetup/pages/StatesModal';

const Location = () => {
  const [type, setType] = React.useState(1);
  const [showModal, setShowModal] = React.useState(false);
  const { setStage, stage, address, setAddress, isPhysical, state, lga, setIsPhysical, setState, setLga } = useEditBusinessState((state) => state);
  
  const { id } = useDetails((state) => state);
  const queryClientt = useQueryClient();

  const {} = useQuery(['getBusiness', id], () => httpClient.get(`/business/${id}`), {
    onSuccess: (data) => {
      console.log(data.data.data);
      setAddress(data?.data.data.address);
      setState(data?.data.data.state);
      setLga(data?.data.data.lga);
      setIsPhysical(data?.data.data.isPhysical);
    }
  })

  // query
  const { isLoading, data } = useQuery(['getStates'], () => httpClient.get('/states'));
  const lgaQuery = useQuery(['getLgas', state], () => httpClient.get(`/states/lgas/${state}`));

  // mutation
  const { isLoading: mutaionLoading, mutate } = useMutation({
    mutationFn: (data: any) => httpClient.put(`/business/location/${id}`, data),
    onSuccess: (data) => {
      Alert.alert('Success', 'Location updated successfully');
      queryClientt.invalidateQueries('getBusiness');
    },
    onError: (error: string) => {
      Alert.alert('Error', error);
    }
  })

  const handlePress = React.useCallback((data: IState | ILga) => {
    if (type === 1) {
      setState((data as IState).name);
      setShowModal(false);
      return;
    } 
    if (type === 2) {
      setLga((data as ILga).LGA);
      setShowModal(false);
      return;
    }
  }, [type, state, lga]);

  const handleSubmit = React.useCallback(() => {
    mutate({ state, lga, isPhysical, address });
  }, [
    state, lga, isPhysical, address
  ])
  return (
    <View style={{ flex: 1, paddingBottom: 20 }}>
      <View style={{ flex: 1 }}>
        <Text variant='subheader'>Where is your business located?</Text>
        <Text variant='body'>Enter an address so your customers can easily find you</Text>

        {isLoading && (
          <ActivityIndicator color={Colors.brandColor} size='large' />
        )}

        {!isLoading && data !== undefined && (
          <>
            {/* SPACER */}
            <View style={{ height: 20 }} />
            <CustomInput placeholder='Address' value={address} onChangeText={(e) => setAddress(e)}  />
            {/* SPACER */}
            <View style={{ height: 20 }} />

            <View width='100%' height={50} flexDirection={"row"}>
                <Checkbox value={isPhysical} onValueChange={() => setIsPhysical(!isPhysical)} iconColor={Colors.white} color={Colors.brandColor} />
                <Text variant='body' marginLeft='m'>My business does not have a physical address</Text>
            </View>

            <CustomSelect placeholder='State' value={state} onPress={() => {
              setType(1);
              setShowModal(true);
              setLga('')
            }} />

            <View style={{ height: 20 }} />

            <CustomSelect placeholder='Lga' value={lga} onPress={() => {
              setType(2);
              setShowModal(true);
            }} />

            <View style={{ height: 20 }} />

            <CustomSelect placeholder='State' value='Nigeria' onPress={() => { }} />

            <View style={{ height: 20 }} />

           
          </>
        )}
      </View>
      <CustomButton label='Next' onPress={handleSubmit} backgroundColor='black' isLoading={mutaionLoading} />
      {showModal && <StateModal onClose={() => setShowModal(false)} data={type === 1 ? data?.data.data : lgaQuery.data?.data.data} isLoading={isLoading || lgaQuery.isLoading} onPress={handlePress} type={type} />}
    </View>
  )
}

export default Location