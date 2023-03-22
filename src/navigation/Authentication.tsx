import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboarding from '../screens/Authentication/onboarding';
import Login from '../screens/Authentication/login';

const Stack = createNativeStackNavigator();

function Authentication(): any {
  return (
   <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" component={Onboarding} />
    <Stack.Screen name='login' component={Login} />
   </Stack.Navigator>
  )
}

export default Authentication