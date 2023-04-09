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
    'coolvetica': require('./assets/fonts/coolvetica.otf'),
    'NotoSansLight': require('./assets/fonts/NotoSans-Light.ttf'),
    'NotoSans-Regular': require('./assets/fonts/NotoSans-Regular.ttf'),
    'NotoSans-SemiBold': require('./assets/fonts/NotoSans-SemiBold.ttf'),
    'AT-Light': require('./assets/fonts/AT-light.otf'),
    'AT-Regular': require('./assets/fonts/AT-regular.otf'),

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
