import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboarding from '../screens/Onboarding';

const Stack = createNativeStackNavigator();

function Authentication(): any {
  return (
   <Stack.Navigator>
    <Stack.Screen name="index" component={Onboarding} />
   </Stack.Navigator>
  )
}

export default Authentication