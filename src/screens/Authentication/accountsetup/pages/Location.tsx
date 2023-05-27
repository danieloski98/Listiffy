import React from 'react'
import { View, Text } from '../../../../components'
import useForm from '../../../../hooks/useForm'
import { CustomSelect, CustomTextInput, SubmitButton } from '../../../../components/form';
import { Feather, Ionicons } from '@expo/vector-icons';
import { fullnameSchema } from '../../../../Services/validation';
import { useAccountSetupState } from '../state';
import {CustomButton} from '../../../../components';
import httpClient from '../../../../utils/axios';
import { useMutation, useQuery } from 'react-query';
import StateModal from './StatesModal';
import { IState } from '../../../../models/State.model';
import { ILga } from '../../../../models/Lga.Model';
import { ActivityIndicator, Alert } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import { useDetails } from '../../../../State/Details';
import { useNavigation } from '@react-navigation/native';

const Location = () => {
  const [state, setState] = React.useState('');
  const [lga, setLga] = React.useState('');
  const [type, setType] = React.useState(1);
  const [showModal, setShowModal] = React.useState(false);
  const { setFullname, setStage, stage, fullname } = useAccountSetupState((state) => state);
  const { id, email, password, setState: setAll } = useDetails((state) => state);
  const navigation = useNavigation<any>();

  // query
  const { isLoading, data } = useQuery(['getStates'], () => httpClient.get('/states'));
  const lgaQuery = useQuery(['getLgas', state], () => httpClient.get(`/states/lgas/${state}`));

   // mutation
   const { isLoading: loginLoading, mutate: loginMutation } = useMutation({ 
    mutationFn: (data: any) => httpClient.post('/user-auth/login', data),
    onError: (error: any) => {
        Alert.alert('Error', error);
        console.log(error.response.data)
    },
    onSuccess: (data) => {
        console.log(data.data.data);
        setAll({...data.data.data, password: '', loggedIn: true});
    }
})

  // mutation
  const { isLoading: mutaionLoading, mutate } = useMutation({
    mutationFn: (data: any) => httpClient.put(`/user/location/${id}`, data),
    onSuccess: (data) => {
      console.log({ email, password });
      loginMutation({ email, password })
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
  }, [type]);

  const handleSubmit = React.useCallback(() => {
    if (state === '' || lga === '') {
      Alert.alert('Warning', 'Please select a state or lga');
      return;
    }
    const obj = {
      state,
      lga,
      country: 'nigeria',
    }
    mutate(obj);
  }, [
    state, lga
  ])
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ width: '100%', height: '10%', justifyContent: 'center' }}>
        <Feather name='chevron-left' size={25} color='black' onPress={() => setStage(stage - 1)} />
      </View>
      <View style={{ flex: 1 }}>
        <Text variant='subheader'>One more thing...</Text>
        <Text variant='body'>Let’s know your locality to help us deliver more accurate content always</Text>

        {isLoading && (
          <ActivityIndicator color={Colors.brandColor} size='large' />
        ) }

        {!isLoading && data !== undefined && (
          <>
            {/* SPACER */}
            <View style={{ height: 20 }} />

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

            <CustomButton label='Set location' onPress={handleSubmit} backgroundColor={Colors.brandColor} isLoading={mutaionLoading || loginLoading} />
          </>
        )}
      </View>
      {showModal && <StateModal onClose={() => setShowModal(false)} data={type === 1 ? data?.data.data : lgaQuery.data?.data.data} isLoading={isLoading || lgaQuery.isLoading} onPress={handlePress} type={type} />}
    </View>
  )
}

export default Location