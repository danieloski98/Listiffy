import React from 'react'
import { View, Text } from '..'
import { StyleSheet } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useDetails } from '../../State/Details'
import { useFeedsState } from '../../screens/Dashboardtabs/feeds/state'

const FeedsHeader = () => {
    const { state } = useDetails((state) => state)
    const { setAll } = useFeedsState((state) => state)
  return (
    <View paddingHorizontal='s' style={Styles.parent}>
      <View style={Styles.firstSection}>
        <Ionicons name="location" size={20} color="red" />
        <Text variant='body' color='black'>{state || 'Rivers'}</Text>
        <Feather name='chevron-down' size={25} color="grey" />
      </View>

      <View style={Styles.secondSection}>
        <Ionicons name="add-circle-outline" color="black" size={25} style={{ marginRight: 10 }} onPress={() => setAll({ showPost: true })} />
        <Ionicons name="notifications-outline" size={25} color='black' />
      </View>
    </View>
  )
}

const Styles = StyleSheet.create({
    parent: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
    },
    firstSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    secondSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
});
export default FeedsHeader