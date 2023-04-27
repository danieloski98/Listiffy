import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDocState } from '../state';
import { useDetails } from '../../../../../State/Details';
import useForm from '../../../../../hooks/useForm';
import { BusinessnameSchema, docSchema, fullnameSchema } from '../../../../../Services/validation';
import { View, Text } from '../../../../../components';
import { CustomTextInput, SubmitButton } from '../../../../../components/form';

const EnterNumber = () => {
    const { setStage, stage, docType, docNumber, setDocNumber } = useDocState((state) => state);
    const { renderForm } = useForm({
        validationSchema: docSchema,
        defaultValues: {
            docNumber
        }
    });

    const handlePress = React.useCallback((data: { docNumber: string}) => {
        setDocNumber(data.docNumber);
        setStage(stage + 1);
    }, []);
  return renderForm(
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flex: 1 }}>
        <Text variant='subheader'>Enter {docType} number</Text>
        <Text variant='body'>Make sure the number is correct</Text>
        {/* SPACER */}
        <View style={{ height: 20 }} />

        <CustomTextInput name='docNumber' placeholder={`Enter ${docType}`} leftIcon={<Ionicons name='document-outline' size={25} color='black'  />} />
      </View>
      <SubmitButton label='Next' onSubmit={handlePress} />
    </View>
  )
}

export default EnterNumber
