import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import Category from './Category';
import Address from './Addrress';
import { View, Text } from '../../../../components';
import { Feather } from '@expo/vector-icons'
import PersonalInfo from './PersonalInfo';
import ContactInfo from './Contactinfo';


const BusinessProfileEditHome = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

const renderPage = React.useCallback(() => {
  const ob = {
      'personal': <PersonalInfo />,
      'address': <Address /> as JSX.Element, 
      'services': <Category /> as JSX.Element,
      contact: <ContactInfo />
  }
  const rm: any = ob[route.params?.name];
  return rm;
}, [(route.params as any)?.name])


  return (
    <View paddingHorizontal='m' flex={1}>
        <View flexDirection='row' height={100} alignItems='center'>
            <Feather onPress={() => navigation.goBack()} name='chevron-left' size={24} color='black' />
            <Text variant='body'>{(route.params as any)?.name}</Text>
        </View>

        <View flex={1}>
            {renderPage()}
        </View>
     
    </View>
  )
}

export default BusinessProfileEditHome