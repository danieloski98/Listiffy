import React from 'react'
import { View, Text, CustomButton } from '../../../../../components'
import { CustomSelect, CustomTextInput, SubmitButton } from '../../../../../components/form';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useAccountSetupState } from '../state';
import { useMutation, useQuery } from 'react-query';
import { ActivityIndicator, Alert } from 'react-native';
import { Checkbox, Colors } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { useDetails } from '../../../../../State/Details';
import httpClient from '../../../../../utils/axios';
import { IState } from '../../../../../models/State.model';
import { ILga } from '../../../../../models/Lga.Model';
import StateModal from '../../../../Authentication/accountsetup/pages/StatesModal';
import { CustomInput } from '../../../../../components/TextInput';

const Location = () => {
  const [type, setType] = React.useState(1);
  const [showModal, setShowModal] = React.useState(false);
  const { setStage, stage, address, setAddress, isPhysical, state, lga, setIsPhysical, setState, setLga } = useAccountSetupState((state) => state);
  
  const { id } = useDetails((state) => state);
  const navigation = useNavigation<any>();

  // query
  const { isLoading, data } = useQuery(['getStates'], () => httpClient.get('/states'));
  const lgaQuery = useQuery(['getLgas', state], () => httpClient.get(`/states/lgas/${state}`));

  // mutation
  const { isLoading: mutaionLoading, mutate } = useMutation({
    mutationFn: (data: any) => httpClient.put(`/user/location/${id}`, data),
    onSuccess: (data) => {
      navigation.navigate('login')
    },
    onError: (error: string) => {
      Alert.alert('Error', error);
    }
  })

  const handlePress = React.useCallback((data: IState | ILga) => {
    if (isPhysical) {
      return;
    } else {
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
    }
  }, [type, state, lga, isPhysical]);

  const handleSubmit = React.useCallback(() => {
    setStage(stage + 1);
  }, [
    state, lga
  ]);

  const handleOpenModal = React.useCallback((type: 1|2) => {
   if (isPhysical) {
    Alert.alert('Warning', 'You have to unselect the checkbox')
   } else {
    setType(type);
    if (type === 1) {
      setLga('')
      setShowModal(true);
    } else {
      setShowModal(true)
    }
   }
  }
  , [isPhysical]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
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
            <CustomInput editable={isPhysical ? false:true} placeholder='Address' value={address} onChangeText={(e) => setAddress(e)}  />
            {/* SPACER */}
            <View style={{ height: 20 }} />

            <View width='100%' height={50} flexDirection={"row"}>
                <Checkbox value={isPhysical} onValueChange={() => setIsPhysical(!isPhysical)} iconColor={Colors.white} color={Colors.brandColor} />
                <Text variant='body' marginLeft='m'>My business does not have a physical address</Text>
            </View>

            <CustomSelect placeholder='State' value={state} onPress={() => handleOpenModal(1)} />

            <View style={{ height: 20 }} />

            <CustomSelect placeholder='Lga' value={lga} onPress={() => handleOpenModal(2)} />

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