import React from 'react'
import { View, Text } from '..'
import { StyleSheet, Image, ScrollView } from 'react-native'
import { Colors } from 'react-native-ui-lib'
import { LinearGradient } from 'expo-linear-gradient';


const AdsEntry = () => {
    return (
        <View style={{ width: 80, height: 80, alignItems: 'center' }}>
            <LinearGradient
            colors={[Colors.brandColor, Colors.accentColor]}
                style={{ width: 64, height: 64, borderRadius: 24, overflow: 'hidden', padding: 2 }}
            >
            <View style={{ width: '100%', height: '100%', borderRadius: 22, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}} >
                <Image source={require('../../../assets/images/greenlogo.png')} resizeMode='contain' style={{ width: 40, height: 40}} />
            </View>
            </LinearGradient>
            <Text variant="xs">Lisstify</Text>
        </View>
    )
}

const AdsPanel = () => {
  return (
    <View paddingHorizontal='s' style={Styles.parent}>
      <ScrollView horizontal contentContainerStyle={{ alignItems: 'center' }} showsHorizontalScrollIndicator={false}>
        <AdsEntry />
        <AdsEntry />
        <AdsEntry />
        <AdsEntry />
        <AdsEntry />
        <AdsEntry />
        <AdsEntry />
      </ScrollView>
    </View>
  )
}

const Styles = StyleSheet.create({
    parent: {
        width: '100%',
        height: 100,
        justifyContent: 'center'
    }
})

export default AdsPanel