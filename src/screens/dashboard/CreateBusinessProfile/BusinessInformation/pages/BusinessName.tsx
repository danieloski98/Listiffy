import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useAccountSetupState } from '../state';
import { useDetails } from '../../../../../State/Details';
import useForm from '../../../../../hooks/useForm';
import { BusinessnameSchema, fullnameSchema } from '../../../../../Services/validation';
import { View, Text } from '../../../../../components';
import { CustomTextInput, SubmitButton } from '../../../../../components/form';

const BusinessName = () => {
    const { setBusinessName, setStage, stage, business_name } = useAccountSetupState((state) => state);
    const { setState, id } = useDetails((state) => state)
    const { renderForm } = useForm({
        validationSchema: BusinessnameSchema,
        defaultValues: {
            business_name,
        }
    });

    const handlePress = React.useCallback((data: { fullname: string}) => {
        setBusinessName(data.fullname);
        setStage(stage + 1);
    }, []);
  return renderForm(
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flex: 1 }}>
        <Text variant='subheader'>What’s your business name?</Text>
        {/* SPACER */}
        <View style={{ height: 20 }} />

        <CustomTextInput name='business_name' placeholder='Business name' leftIcon={<Ionicons name='briefcase-outline' size={25} color='black'  />} />
      </View>
      <SubmitButton label='Next' onSubmit={handlePress} />
    </View>
  )
}

export default BusinessName
