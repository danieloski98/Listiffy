import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from './Dashboard';
import Notifications from '../screens/dashboard/Notifications';
import BusinessProfile from '../screens/dashboard/BusinessProfile';
import Post from '../screens/dashboard/Post';
import Ads from '../screens/dashboard/Ads';
import CreateBusinessProfile from '../screens/dashboard/CreateBusinessProfile';
import BusinessInforrmation from '../screens/dashboard/CreateBusinessProfile/BusinessInformation';
import Verification from '../screens/dashboard/CreateBusinessProfile/Verification';
import EditBasicProfile from '../screens/dashboard/EditBasicProfile';
import EditBusinessProfile from '../screens/dashboard/EditBusinessProfile';
const { Navigator, Screen } = createNativeStackNavigator();

const Home = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Dashboard} />
      <Screen name='notification' component={Notifications} />
      <Screen name='business-profile' component={BusinessProfile} />
      <Screen name="post" component={Post} />
      <Screen name="ads" component={Ads} />
      <Screen name='createbusinessprofile' component={CreateBusinessProfile} />
      <Screen name='businessinformation' component={BusinessInforrmation} />
      <Screen name='verificatiton' component={Verification} />
      <Screen name='editbasicprofile' component={EditBasicProfile} />
      <Screen name='editbusinessprofile' component={EditBusinessProfile} />
    </Navigator>
  )
}

export default Home