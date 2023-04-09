import React from 'react'
import FeedsHeader from '../../../components/dashboardtabs/FeedsHeader'
import { View, Text } from '../../../components'
import AdsPanel from '../../../components/dashboardtabs/AdsPanel'
import { ScrollView } from 'react-native'
import PostCard from '../../../components/dashboardtabs/PostCard'

const Feeds = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'whitesmoke' }}>
      <FeedsHeader />
      <AdsPanel />
      <ScrollView>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </ScrollView>
    </View>
  )
}

export default Feeds