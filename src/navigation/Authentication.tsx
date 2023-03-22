import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboarding from '../screens/Authentication/onboarding';

const Stack = createNativeStackNavigator();

function Authentication(): any {
  return (
   <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" component={Onboarding} />
   </Stack.Navigator>
  )
}

export default Authentication