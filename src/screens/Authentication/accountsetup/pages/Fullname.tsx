import React from 'react'
import { View, Text } from '../../../../components'
import useForm from '../../../../hooks/useForm'
import { CustomTextInput, SubmitButton } from '../../../../components/form';
import { Feather, Ionicons } from '@expo/vector-icons';
import { fullnameSchema } from '../../../../Services/validation';
import { useAccountSetupState } from '../state';

const Fullname = () => {
    const { setFullname, setStage, stage, fullname } = useAccountSetupState((state) => state);
    const { renderForm } = useForm({
        validationSchema: fullnameSchema,
        defaultValues: {
            fullname: fullname,
        }
    });

    const handlePress = React.useCallback((data: { fullname: string}) => {
        setFullname(data.fullname);
        setStage(stage + 1);
    }, []);
  return renderForm(
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flex: 1 }}>
        <Text variant='subheader'>What’s your full name?</Text>
        <Text variant='body'>This helps us to identify you</Text>

        {/* SPACER */}
        <View style={{ height: 20 }} />

        <CustomTextInput name='fullname' placeholder='Fullname' leftIcon={<Ionicons name='person-circle-outline' size={25} color='black'  />} />
      </View>
      <SubmitButton label='Next' onSubmit={handlePress} />
    </View>
  )
}

export default Fullname