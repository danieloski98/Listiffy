import {ImageBackground, StatusBar, Image, Pressable } from 'react-native'
import { View, Text, ThemeManager, Colors, Button } from 'react-native-ui-lib'
import React from 'react'
import { Style } from './style'
import { Feather } from '@expo/vector-icons'

const data = [
    {
        image: require('../../../../assets/images/phone1.png'),
        title: 'Reach more customers. ',
        body: 'List, showcase and advertise to the world for free.',
    },
    {
        image: require('../../../../assets/images/phone2.png'),
        title: 'Meet the best plugs.',
        body: 'Find business accounts or vendors around you for all your services.',
    },
    {
        image: require('../../../../assets/images/phone3.png'),
        title: 'Stay connected always.',
        body: 'See what vendors and business are up to daily.'
    },
]

const Onboarding = ({ navigation }: any) => {
    const [count, setCount] = React.useState(0);
  return (
    <View flex bg-brandColor width='100%'>
      <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
      <ImageBackground source={require('../../../../assets/images/meshbackground.png')} style={Style.backgroundImage}>
        <View height='20%' width='100%' bottom centerH >
            <Image source={require('../../../../assets/images/logo.png')} resizeMode='contain' style={Style.icon}  />
        </View>
        <View style={{ width: '100%', flex: 1, paddingHorizontal: 20, overflow: 'hidden'}}>
            <Image source={data[count].image} resizeMode='contain' style={Style.phoneImage} />
        </View>
      </ImageBackground>
      <View paddingH={20 as any} style={{ padding: 20, flex: 0.3, backgroundColor: 'white', width: '100%' }}>
        <Text header>{data[count].title}</Text>
        <Text regular>{data[count].body}</Text>
        {count < 2 && (
            <View centerV style={{ height: '50%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row'}}>
                    <View style={{ width: count === 0 ? 30:10, height: 10, borderRadius: 10, backgroundColor: count === 0 ? Colors.accentColor:'grey', marginRight: 10, }}></View>
                    <View style={{ width: count === 1 ? 30:10, height: 10, borderRadius: 10, backgroundColor: count === 1 ? Colors.accentColor:'grey' }}></View>
                </View>
                <Pressable onPress={() => setCount(prev => prev + 1)} style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
                    <Feather name='arrow-right' size={25} color="white" />
                </Pressable>
            </View>
        )}
        {count === 2 && (
            <View centerV style={{ width: '100%', height: '50%' }}>
                <Button onPress={() => navigation.navigate('login')}  label='Get Started' size={Button.sizes.large} backgroundColor={Colors.black} borderRadius={5} />
                <Text onPress={() => navigation.navigate('login')} style={{ textAlign: 'center', marginTop: 10 }} light>Have an account ? <Text light brandColor>Login</Text></Text>
            </View>
        )}
      </View>
    </View>
  )
}

export default Onboarding