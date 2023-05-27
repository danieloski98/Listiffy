import React from 'react'
import { Pressable } from 'react-native';
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
    <View paddingHorizontal='m' flex={1} backgroundColor='white'>
        <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems:'center', height: 100, paddingTop: 10 }}>
            <Feather name='chevron-left' size={28} color='black' style={{ marginTop: 2}} />
            <Text variant='body' style={{ fontSize: 17 }}>{(route.params as any)?.name.toUpperCase()}</Text>
        </Pressable>

        <View flex={1}>
            {renderPage()}
        </View>
     
    </View>
  )
}

export default BusinessProfileEditHome