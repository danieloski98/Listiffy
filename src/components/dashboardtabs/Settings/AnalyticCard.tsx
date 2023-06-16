import { View, Text } from '../../'
import React from 'react'
import { Feather } from '@expo/vector-icons'

interface IProps {
    icon:JSX.Element;
    title: string;
    backgroundColor: string;
    borderColor: string;
    text: string;
    rate: string;
}

const AnalyticCard = ({
    icon, title, backgroundColor, borderColor, text, rate
}: IProps) => {
  return (
    <View width={`100%`} borderRadius={20} padding='s' flex={1} style={{ backgroundColor, borderWidth: 2, borderColor }}>
      <View width={37} height={37} borderRadius={35} style={{ backgroundColor: '#222222' }} justifyContent={'center'} alignItems={'center'}>
        { icon }
      </View>

      <View flexDirection={'row'} width={`100%`} justifyContent={`space-between`} alignItems={`center`} my='l'>
        <Text variant='medium'>{title}</Text>
        <Feather name="chevron-right" size={20} color={'grey'} />
      </View>

      <View flexDirection={'row'} width={`100%`} justifyContent={`space-between`} flexWrap={'wrap'}>
        <Text variant='body'>{text}</Text>
        <Text variant='body' color='brandColor'>{rate}</Text>
      </View>

    </View>
  )
}

export default AnalyticCard