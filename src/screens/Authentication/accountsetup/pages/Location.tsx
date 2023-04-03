import React from 'react'
import { View, Text } from '../../../../components'
import useForm from '../../../../hooks/useForm'
import { CustomSelect, CustomTextInput, SubmitButton } from '../../../../components/form';
import { Feather, Ionicons } from '@expo/vector-icons';
import { fullnameSchema } from '../../../../Services/validation';
import { useAccountSetupState } from '../state';
import CustomButton from '../../../../components/generalComponents/Button';
import httpClient from '../../../../utils/axios';
import { useQuery } from 'react-query';
import StateModal from './StatesModal';
import { IState } from '../../../../models/State.model';
import { ILga } from '../../../../models/Lga.Model';
import { ActivityIndicator } from 'react-native';
import { Colors } from 'react-native-ui-lib';

const Location = () => {
  const [state, setState] = React.useState('');
  const [lga, setLga] = React.useState('');
  const [type, setType] = React.useState(1);
  const [showModal, setShowModal] = React.useState(false);
  const { setFullname, setStage, stage, fullname } = useAccountSetupState((state) => state);

  // query
  const { isLoading, data } = useQuery(['getStates'], () => httpClient.get('/states'));
  const lgaQuery = useQuery(['getLgas', state], () => httpClient.get(`/states/lgas/${state}`));

  console.log(data?.data);

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

            <CustomButton label='Set location' onPress={() => { }} backgroundColor='black' textColor='white' />
          </>
        )}
      </View>
      {showModal && <StateModal onClose={() => setShowModal(false)} data={type === 1 ? data?.data.data : lgaQuery.data?.data.data} isLoading={isLoading || lgaQuery.isLoading} onPress={handlePress} type={type} />}
    </View>
  )
}

export default Location