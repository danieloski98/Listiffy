import React from 'react'
import { Colors, Text } from 'react-native-ui-lib';

interface IProps {
    color?: string;
    text: string | number;
}

const RegularText = ({ color = Colors.black, text}: IProps) => {
  return (
   <Text color={color} regular>{text}</Text>
  )
}

export default RegularText