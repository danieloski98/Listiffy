import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Authentication from './Authentication'
import { ThemeProvider } from '@shopify/restyle'
import theme from '../Theme/theme'

const Navigation = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Authentication />
    </NavigationContainer>
    </ThemeProvider>
  )
}

export default Navigation