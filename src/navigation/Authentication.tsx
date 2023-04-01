import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboarding from '../screens/Authentication/onboarding';
import Login from '../screens/Authentication/login';
import Signup from '../screens/Authentication/signup';
import VerifyEmail from '../screens/Authentication/verifyemail';
import AccountSetup from '../screens/Authentication/accountsetup';
import RestePassword from '../screens/Authentication/changepassword';

const Stack = createNativeStackNavigator();

function Authentication(): any {
  return (
   <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" component={Onboarding} />
    <Stack.Screen name='login' component={Login} />
    <Stack.Screen name='signup' component={Signup} />
    <Stack.Screen name='verifyemail' component={VerifyEmail} />
    <Stack.Screen name='setup' component={AccountSetup} />
    <Stack.Screen name='resetpassword' component={RestePassword} />
   </Stack.Navigator>
  )
}

export default Authentication