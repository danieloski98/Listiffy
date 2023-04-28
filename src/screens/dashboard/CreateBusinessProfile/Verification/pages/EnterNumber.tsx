import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDocState } from '../state';
import { View, Text, CustomButton } from '../../../../../components';
import { CustomInput } from '../../../../../components/TextInput';

const EnterNumber = () => {
    const { setStage, stage, docType, docNumber, setDocNumber } = useDocState((state) => state);

    const handlePress = React.useCallback(() => {
        setStage(stage + 1);
    }, []);
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flex: 1 }}>
        <Text variant='subheader'>Enter {docType} number</Text>
        <Text variant='body'>Make sure the number is correct</Text>
        {/* SPACER */}
        <View style={{ height: 20 }} />

        <CustomInput placeholder={`Enter ${docType}`} value={docNumber} onChangeText={setDocNumber} leftIcon={<Ionicons name='document-outline' size={25} color='black'  />} />
      </View>
      <CustomButton label='Next' onPress={handlePress} />
    </View>
  )
}

export default EnterNumber
