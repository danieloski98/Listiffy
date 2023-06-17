import {  } from 'react-native'
import React from 'react'
import { View, Text } from '../..'
import { StyleSheet } from 'react-native'
import { Colors, ProgressBar } from 'react-native-ui-lib'

const PostProgressReport = ({
    progress
}: {
    progress: number
}) => {
    const text = React.useCallback(() => {
        switch (progress) {
            case 0: {
                return 'Publishing your post might take a while...'
            }
            case 90: {
                return 'Finishing up...'
            }
        }
    }, [progress]);
  return (
    <View style={styles.container}>
        <View style={styles.parent}>
      { progress < 100 && (
        <>
            <Text variant='body' marginBottom='l' style={{ color: '#085122'}}>{text()}</Text>
            <ProgressBar progress={55} progressColor='#14C251'/>
        </>
      )}
      {
        progress === 100 && (
          <Text variant='body' style={{ color: '#085122'}}>Lovely, your post has been published!</Text>
        )
      }
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    parent:{
        width: '100%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#E8F9EE'
    }
})

export default PostProgressReport