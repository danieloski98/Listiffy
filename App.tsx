import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Navigation /> */}
      <Text>Hell people</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
