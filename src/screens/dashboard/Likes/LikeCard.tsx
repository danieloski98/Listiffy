import { StyleSheet, Image } from 'react-native'
import React from 'react'
import { View, Text } from '../../../components'
import { CommentModel } from '../../../models/CommentModel'
import { useQuery } from 'react-query'
import httpClient from '../../../utils/axios'
import { UserModel } from '../../../models/User.Model'
import TimeAgo from 'react-native-timeago';
import { LikeModel } from '../../../models/LikeModel'

const LikeCard = ({
    id, userId
}: LikeModel) => {
    const [user, setUser] = React.useState<UserModel | null>(null);
    const {isLoading, data } = useQuery(['getUser', id], () => httpClient.get(`/user/${userId}`), {
        onSuccess: (data) => {
            console.log(data.data.data);
            setUser(data.data.data);
        },
        onError: (error: any) => {
            console.log(error)
        }
    })
  return (
    <View style={styles.parent}>
        {/* HEADER SECTION */}

      <View style={styles.header}>
        <View flexDirection='row' alignItems='center' width={50} height={50} borderRadius={10} overflow='hidden' >
            <Image source={{ uri: user?.profilePicture }} style={styles.image} />
        </View>
        <View justifyContent='center' marginLeft='s'>
          <View flexDirection='row' alignItems='center'>
            <Text variant='medium'>{user?.username}</Text>
            <Text variant='xs' marginLeft='s'>@{user?.username}</Text>
          </View>
        </View>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
    parent: {
        marginBottom: 10,
        justifyContent: 'center'
    },
    header: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
    }
});

export default LikeCard