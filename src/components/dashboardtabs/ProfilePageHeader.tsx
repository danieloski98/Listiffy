import { StyleSheet } from 'react-native'
import { Switch, Colors } from 'react-native-ui-lib'
import React from 'react'
import { View, Text } from '..'

const ProfilePageHeader = () => {
    const [checked, setChecked] = React.useState(false);
  return (
    <View style={Styles.parent} padding='m'>
      <Text variant='body'>Business Profile</Text>
      <Switch offColor={Colors.grey} onColor={Colors.brandColor} value={checked} onValueChange={() => setChecked(prev => !prev)} />
    </View>
  )
}

const Styles = StyleSheet.create({
    parent: {
        width: '100%',
        height: '12%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    }
})

export default ProfilePageHeader