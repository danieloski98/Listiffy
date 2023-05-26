import React from 'react';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation';
import { useFonts } from 'expo-font'
import {InitFunction} from './src/style'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    'satoshi-bold': require('./assets/fonts/Satoshi-Bold.otf'),
    'satoshi-medium': require('./assets/fonts/Satoshi-Medium.otf'),
    'satoshi-regular': require('./assets/fonts/Satoshi-Regular.otf'),
    'satoshi-light': require('./assets/fonts/Satoshi-Light.otf'),
  });

  React.useEffect(() => {
    InitFunction();
  })
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
