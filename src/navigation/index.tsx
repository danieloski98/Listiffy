import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Authentication from './Authentication'
import { ThemeProvider } from '@shopify/restyle'
import theme from '../Theme/theme'
import Home from './Home'
import { useDetails } from '../State/Details'
import { Colors, Incubator } from 'react-native-ui-lib'
import { useToast } from '../State/Toast.state'

const {Toast} = Incubator;

const Navigation = () => {
  const { loggedIn } = useDetails((state) => state)
  const { showToast, message, setShowToast, preset } = useToast((state) => state)
  return (
    <ThemeProvider theme={theme}>
      <StatusBar translucent backgroundColor='transparent' barStyle='dark-content' />
      <NavigationContainer>
        {!loggedIn &&  <Authentication />}
       {loggedIn &&  <Home />}
       <Toast 
        visible={showToast}
        message={message}
        swipeable={true}
        backgroundColor={Colors.brandColor}
        onDismiss={() => setShowToast(false)}
        messageStyle={{color: 'white', fontFamily: 'satoshi-regular'}}
        centerMessage
        autoDismiss={10000}
        preset={preset}
      />
    </NavigationContainer>
    </ThemeProvider>
  )
}

export default Navigation