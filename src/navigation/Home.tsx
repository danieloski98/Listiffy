import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from './Dashboard';
import Notifications from '../screens/dashboard/Notifications';
import Post from '../screens/dashboard/Post';
import Ads from '../screens/dashboard/Ads';
import CreateBusinessProfile from '../screens/dashboard/CreateBusinessProfile';
import BusinessInforrmation from '../screens/dashboard/CreateBusinessProfile/BusinessInformation';
import Verification from '../screens/dashboard/CreateBusinessProfile/Verification';
import EditBasicProfile from '../screens/dashboard/EditBasicProfile';
import EditBusinessProfile from '../screens/dashboard/EditBusinessProfile';
import BasicProfileEditHome from '../screens/dashboard/EditBasicProfile/Pages/Home';
import BusinessProfileEditHome from '../screens/dashboard/EditBusinessProfile/Pages/Home';
import BusinessProfile from '../components/dashboardtabs/Profile/BusinessProfile';
import Comments from '../screens/dashboard/Comments';
import Likes from '../screens/dashboard/Likes';
import ViewBusinessProfile from '../screens/dashboard/BusinessProfile';
import PublishedPost from '../screens/dashboard/PublishedPost';
import WriteReview from '../screens/dashboard/WriteReview';
import Bookmarks from '../screens/dashboard/Bookmarks';
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
      <Screen name='editbasic' component={BasicProfileEditHome} />
      <Screen name='editbusiness' component={BusinessProfileEditHome} />
      <Screen name="comments" component={Comments} />
      <Screen name='likes' component={Likes} />
      <Screen name='view-profile' component={ViewBusinessProfile} />
      <Screen name='published-post' component={PublishedPost as any} />
      <Screen name="write-review" component={WriteReview} />
      <Screen name="bookmarks" component={Bookmarks} />
    </Navigator>
  )
}

export default Home