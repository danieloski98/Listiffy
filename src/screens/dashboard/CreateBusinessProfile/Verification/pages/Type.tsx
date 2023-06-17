import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDocState } from '../state';
import { useDetails } from '../../../../../State/Details';
import useForm from '../../../../../hooks/useForm';
import { BusinessnameSchema, fullnameSchema } from '../../../../../Services/validation';
import { View, Text, CustomButton } from '../../../../../components';
import { CustomTextInput, SubmitButton } from '../../../../../components/form';
import { ScrollView } from 'react-native-gesture-handler';
import { Alert, Pressable } from 'react-native';
import { Colors } from 'react-native-ui-lib';

const DOCS = [
    'CAC',
    'Drivers License',
    'NIN',
    'Voters Card',
    'Passport',
]


const BusinessName = () => {
    const { setStage, stage, setDocType, idx, setIdx } = useDocState((state) => state);
    const [indx, setIndex] = React.useState<number>(idx);
   

    const handlePress = React.useCallback(() => {
        if (idx === undefined) {
            Alert.alert('Warning', 'You have to select a verification method');
            return;
        }
        setDocType(DOCS[idx as number]);    
        setStage(stage + 1);
    }, [idx]);
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <Text variant='medium'>Choose verification method</Text>
        <Text variant='body'>Choose a CAC if you’re a company</Text>
        {/* SPACER */}
        <View style={{ height: 20 }} />

        <View flex={1}>
            <ScrollView>
                {DOCS.map((doc, index) => (
                    <Pressable onPress={() => {setIdx(index); setDocType(DOCS[idx]); }} key={index} style={{ width: '100%', flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
                        <View width={30} height={30} borderRadius={15} borderWidth={ idx === index ? 0 : 1} borderColor='black' backgroundColor={idx === index ? 'brandColor' : 'white'} justifyContent='center' alignItems='center' />
                        <Text variant='medium' marginLeft='m'>{doc}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>

        <CustomButton label='next' onPress={handlePress} backgroundColor={Colors.brandColor} />

      </View>
    </View>
  )
}

export default BusinessName
