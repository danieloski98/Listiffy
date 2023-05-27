import React from 'react'
import { View, Text } from '../../../../components';
import { Feather } from '@expo/vector-icons'
import PersonalInfor from './PersonalInfor';
import BasicProfileFollowPages from './Pages';
import Categories from './Categories';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Pressable } from 'react-native';


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
    <View paddingHorizontal='m' flex={1} backgroundColor='white'>
        <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', height: 100}}>
            <Feather name='chevron-left' size={30} color='black' style={{ marginTop: 2}} />
            <Text variant='body' fontSize={17}>{(route.params as any)?.name.toUpperCase() }</Text>
        </Pressable>

        <View flex={1}>
            {renderPage()}
        </View>
     
    </View>
  )
}

export default BasicProfileEditHome