import { Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feeds from '../screens/Dashboardtabs/feeds'
import Profile from '../screens/Dashboardtabs/profile'
import Search from '../screens/Dashboardtabs/search'
import Settings from '../screens/Dashboardtabs/settings'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from 'react-native-ui-lib'

const { Navigator, Screen } = createBottomTabNavigator()

const OS = Platform.OS;

const Dashboard = () => {
  return (
    <Navigator initialRouteName='feeds' screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { height: OS === 'ios' ? 88 : 88, paddingTop: OS === 'ios' ? 10:0 }  }} >
      <Screen name="feeds" component={Feeds} options={{ tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'md-home':'md-home-outline'} size={25} color={focused ? Colors.brandColor:'lightgrey'} style={{ borderBottomWidth: 3, borderBottomColor: focused ? Colors.brandColor:'transparent'}} />}} />

      <Screen name="search" component={Search} options={{ tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'search-circle':'search-circle-outline'} size={35} color={focused ? Colors.brandColor:'lightgrey'} style={{ borderBottomWidth: 3, borderBottomColor: focused ? Colors.brandColor:'transparent'}} />}} />

      <Screen name="profile" component={Profile} options={{ tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'person-circle':'person-circle-outline'} size={30} color={focused ? Colors.brandColor:'lightgrey'} style={{ borderBottomWidth: 3, borderBottomColor: focused ? Colors.brandColor:'transparent'}} />}} />

      <Screen name="settings" component={Settings} options={{ tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'reorder-four':'reorder-four-outline'} size={30} color={focused ? Colors.brandColor:'lightgrey'} style={{ borderBottomWidth: 3, borderBottomColor: focused ? Colors.brandColor:'transparent'}} />}} />
    </Navigator>
  )
}

export default Dashboard