import React from 'react'
import { View, Text } from '../../../components'
import { ImageBackground, Pressable, StyleSheet, Image } from 'react-native'
import { Colors } from 'react-native-ui-lib'
import { Feather } from '@expo/vector-icons';

const VerificationTrackerTiles = ({ title, started,icon, onPress}: { title: string, started: boolean, icon: 'user'|'key', onPress: () => void}) => (
    <Pressable onPress={onPress} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
        <Feather name={icon} size={30} color="black" />
        <View flex={1} paddingHorizontal='l'>
            <Text variant='subheader'>{title}</Text>
            <Text variant='body'>Not started</Text>
        </View>
        <Feather name="chevron-right" size={30} color="black" />
    </Pressable>
)

const CreateBusinessProfile = ({ navigation }: { navigation: any }) => {

    const handlePress = React.useCallback((route: 'businessinformation') => {
        navigation.navigate(route);
    }, []);
  return (
    <View flex={1} backgroundColor='white'>
     <View style={{ height: '50%', width: '100%' }}>
        <ImageBackground source={require('../../../../assets/images/meshbackground.png')} resizeMode='cover' style={[StyleSheet.absoluteFillObject, { height: '100%', width: '100%', backgroundColor: Colors.brandColor}]}>
            <View style={{ height: '20%',}} paddingHorizontal='m' justifyContent='flex-end'>
                <Feather name="chevron-left" size={30} color='white' onPress={() => navigation.goBack()} />
            </View>
            <View flex={1} paddingTop='m'>
                <Image source={require('../../../../assets/images/createbusiness.png')} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
            </View>
        </ImageBackground>
     </View>
    <View style={{ height: '50%', width: '100%', flex: 1 }} padding='m'>
        <Text variant='header'>Set up Business Profile</Text>
        <Text variant='body' marginTop='m'>Join +1000 vendors to drive more sales and more business exposure. As a vendor you will have access to Showcase Products & Services, Run Advertisements at low cost, Get Business reviews,
            Boost SEO ranking
        </Text>

        <View style={{ width: '100%', height: '40%', backgroundColor: '#F9F9F9', borderRadius: 20 }} marginTop='m'>
            <VerificationTrackerTiles onPress={() => handlePress('businessinformation')} title='Provide Business information' started={false} icon='user' />
            <VerificationTrackerTiles onPress={() => handlePress('businessinformation')} title='Verfiy Identity' started={false} icon='key' />
        </View>
    </View>
    </View>
  )
}

export default CreateBusinessProfile