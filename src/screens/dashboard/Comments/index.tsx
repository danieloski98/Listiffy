import { StyleSheet } from 'react-native'
import React from 'react'
import { View, Text } from '../../../components'
import { Feather } from '@expo/vector-icons'
import { useQuery } from 'react-query'
import httpClient from '../../../utils/axios'
import handleToast from '../../../hooks/handleToast'

const Comments = ({ route }: any) => {
    const { params: { postId } } =route;
    const { ShowToast } = handleToast();
    const { isLoading, data } = useQuery(['getPost', postId], () => httpClient.get(`/post/${postId}`), {
        onSuccess: (data) => {
            console.log(data.data)
        },
        onError: (error: any) => {
            ShowToast({ message: error, preset: 'failure' });
        }
    });
  return (
    <View style={styles.parent}>
        {/* HEADER */}
        <View style={styles.header}>
            <View flexDirection='row' alignItems='center'>
                <Feather name="chevron-left" size={30} color="grey" />
                <Text variant='body'>Comments</Text>
            </View>

            <View flexDirection='row' alignItems='center' flex={0.4} justifyContent='space-evenly'>
                <Feather name="heart" size={20} color="grey" />
                <Text variant='body'>23</Text>
                <Text variant='body'>Likes</Text>
            </View>
        </View>

        {/* MAIN CONTENT AREA */}
        <View style={styles.mainarea}></View>

        {/* FOOTER */}
        <View style={styles.footer}></View>
    </View>
  )
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    mainarea: {
        flex: 1,
    },
    footer: {
        width: '100%',
        height: '15%',
        backgroundColor: '#F9F9F9'
    }
})

export default Comments