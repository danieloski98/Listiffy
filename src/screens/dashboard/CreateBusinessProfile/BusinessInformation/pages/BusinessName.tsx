import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useAccountSetupState } from '../state';
import { useDetails } from '../../../../../State/Details';
import useForm from '../../../../../hooks/useForm';
import { BusinessnameSchema, fullnameSchema } from '../../../../../Services/validation';
import { View, Text, CustomButton } from '../../../../../components';
import { CustomTextInput, SubmitButton } from '../../../../../components/form';
import { CustomInput } from '../../../../../components/TextInput';
import { Colors } from 'react-native-ui-lib';

const BusinessName = () => {
    const { setBusinessName, setStage, stage, business_name } = useAccountSetupState((state) => state);
    const { setState, id } = useDetails((state) => state)


    const handlePress = React.useCallback(() => {
        setStage(stage + 1);
    }, []);
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flex: 1 }}>
        <Text variant='medium'>What’s your business name?</Text>
        {/* SPACER */}
        <View style={{ height: 20 }} />

        <CustomInput value={business_name} onChangeText={(e) => setBusinessName(e)} placeholder='Business name' leftIcon={<Ionicons name='briefcase-outline' size={25} color='black'  />} />
      </View>
      <CustomButton label='Next' onPress={handlePress} backgroundColor={Colors.brandColor} />
    </View>
  )
}

export default BusinessName
