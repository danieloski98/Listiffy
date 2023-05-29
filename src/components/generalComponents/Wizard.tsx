import { View, StyleSheet } from 'react-native'
import { Text } from '../'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { Colors } from 'react-native-ui-lib';

interface IProps {
    activeIndex: number;
    count: number;
    height?: number
}

const Wizard = ({ activeIndex, count, height = 60 }: IProps) => {
    const [array, setArray] = React.useState<Array<any>>([]);

    React.useEffect(() => {
        setArray(new Array(count).fill(0));
    }, [])
  return (
    <View style={{ ...style.parent, height}}>
      {
        array.map((_, index) => (
            <>
                <View style={style.item} key={index}>
                    {activeIndex === index+1 || activeIndex < index+1 && <Text variant='body' color='brandColor'>{index+1}</Text>}
                    {activeIndex > index && <Feather name="check" size={25} color={Colors.brandColor} />}
                </View>
                {index !== array.length - 1 && <View style={{ flex: 1 , height: 1, backgroundColor: 'white' }} />}
            </>
        ))
      }
    </View>
  )
}

const style = StyleSheet.create({
    parent: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    item: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8F9F4'
    }
});

export default Wizard