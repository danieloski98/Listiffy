import { StyleSheet, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { View, Text } from '..'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'react-native-ui-lib';
import PagerView from 'react-native-pager-view';

const Images = [
   require('../../../assets/images/deliciousfood1.jpeg'),
   require('../../../assets/images/deliciousfood2.jpeg'),
   require('../../../assets/images/food.jpeg'),
   require('../../../assets/images/food2.jpeg'),
   require('../../../assets/images/food3.jpeg'),
]

const PostCard = () => {
    const { height } = useWindowDimensions()
    const [index, setIndex] = React.useState(0);
  return (
    <View style={Styles.parent}>
        {/* HEADER */}
        <View style={Styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <LinearGradient
                    colors={[Colors.brandColor, Colors.accentColor]}
                    style={{ width: 54, height: 54, borderRadius: 18, overflow: 'hidden', padding: 2 }}
                >
                    <View style={{ width: '100%', height: '100%', borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}} >
                        <Image source={require('../../../assets/images/greenlogo.png')} resizeMode='contain' style={{ width: 30, height: 30}} />
                    </View>
                </LinearGradient>
                <View style={{ paddingLeft: 10}}>
                    <Text variant='subheader'>Listify <Text variant='body'>@listify</Text></Text>
                    <Text variant='xs'>2d ago</Text>
                </View>
            </View>

            {/* ICON BOX */}
            <View>
                <Feather name="more-horizontal" size={25} color="black" />
            </View>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text variant='body' marginVertical='m' textAlign='justify' ellipsizeMode='tail' numberOfLines={2} >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore deserunt praesentium nemo tempore ratione cupiditate non nulla, ipsa architecto assumenda.
            </Text>
            <Text variant='xs' color='brandColor' style={{ marginTop: -20}}>More</Text>
        </View>
        

        {/* IMAGE BOX */}
        <View marginVertical='m' style={{ flex: 1, backgroundColor: 'black', borderRadius: 20, overflow: 'hidden', width: '100%', height:  height / 100 * 60 }}>
            <PagerView style={{ flex: 1 }} initialPage={0} onPageScroll={(e) => setIndex(e.nativeEvent.position)}>
                {Images.map((Item, indx) => (
                     <Image key={indx} source={Item}  style={[StyleSheet.absoluteFillObject, { width: '100%', height: '100%'}]} />
                ))}
            </PagerView>

            <View style={{ width: '100%', height: 40, backgroundColor: 'transparent', position: 'absolute', bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {Images.map((item, inx) => (
                    <View key={inx} style={{ width: 5, height: 5, borderRadius: 5, backgroundColor: inx === index ? Colors.white:'lightgrey', transform: [
                        { scale: inx === index ? 1.5: 1}
                    ] }} marginRight='s' />
                ))}
            </View>
        </View>

        {/* ACTIVITY BOX */}
        <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-between'}}>

            <View style={{ flexDirection: 'row' }}>
               <View flexDirection='row'>
                    <Feather name='heart' size={20} color='black'  />
                    <Text variant='xs' color='black'>10</Text>
               </View>

               <View flexDirection='row' marginHorizontal='m'>
                    <Feather name='message-circle' size={20} color='black'  />
                    <Text variant='xs'>10</Text>
               </View>

               <View flexDirection='row'>
                    <Feather name='share-2' size={20} color='black'  />
               </View>
            </View>

            <Feather name='bookmark' size={25} color='black' />
        </View>
    </View>
  )
}

const Styles = StyleSheet.create({
    parent: {
        width: '100%',
        backgroundColor: 'white',
        padding: 10,
        marginTop: 10
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

export default PostCard