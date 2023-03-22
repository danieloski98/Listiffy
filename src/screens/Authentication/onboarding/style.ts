import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-ui-lib'

export const Style = StyleSheet.create({
    parent: {
        flex: 1
    },
    backgroundImage: {
        backgroundColor: Colors.brandColor, 
        flex: 0.7, 
        width: '100%'
    },
    phoneImage: {
        width: '100%', 
        height: '150%'
    },
    icon: {
        width: '80%', 
        height: 30
    }
});