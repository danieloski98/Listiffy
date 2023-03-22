import React from 'react'
import { Colors, Text } from 'react-native-ui-lib';

interface IProps {
    color?: string;
    text: string | number;
}

const SubHeaderText = ({ color = Colors.black, text}: IProps) => {
  return (
   <Text color={color} semibold>{text}</Text>
  )
}

export default SubHeaderText