import React from 'react'
import { View, Text } from '../../../../components';
import { Feather } from '@expo/vector-icons'
import PersonalInfor from './PersonalInfor';
import BasicProfileFollowPages from './Pages';
import Categories from './Categories';
import { useNavigation, useRoute } from '@react-navigation/native';


const BasicProfileEditHome = () => {
const route = useRoute();
const navigation = useNavigation<any>();

const renderPage = React.useCallback(() => {
    const ob = {
        'personalinformation': <PersonalInfor /> as JSX.Element,
        'pages': <BasicProfileFollowPages /> as JSX.Element, 
        'categories': <Categories /> as JSX.Element
    }
    return ob[(route.params as any)?.name];
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

export default BasicProfileEditHome