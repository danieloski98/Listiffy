import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Authentication from './Authentication'
import { ThemeProvider } from '@shopify/restyle'
import theme from '../Theme/theme'
import Home from './Home'
import { useDetails } from '../State/Details'

const Navigation = () => {
  const { loggedIn } = useDetails((state) => state)
  return (
    <ThemeProvider theme={theme}>
      <StatusBar translucent backgroundColor='transparent' barStyle='dark-content' />
      <NavigationContainer>
        {/* {!loggedIn &&  <Authentication />}
       {loggedIn &&  <Home />} */}
        <Home/>
    </NavigationContainer>
    </ThemeProvider>
  )
}

export default Navigation