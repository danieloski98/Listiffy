import React from 'react'
import { Colors, Text } from 'react-native-ui-lib';

interface IProps {
    color?: string;
    text: string | number;
}

const HeaderText = ({ color = Colors.black, text}: IProps) => {
  return (
   <Text color={color} header>{text}</Text>
  )
}

export default HeaderText