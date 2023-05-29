import React from 'react'
import { Button, Colors } from 'react-native-ui-lib'
import { Pressable } from 'react-native';
import { Text } from '../Text';

interface IProps {
    disabled?: boolean;
    size?: 'xSmall' | 'small' | 'medium' | 'large';
    borderRadius?: number;
    onPress?: () => void;
    backgroundColor?: string;
    textColor?: string;
    label: string;
}

const CustomButton = ({ label, disabled = false, size = 'large', borderRadius = 10, backgroundColor = Colors.buttonGreen, textColor = 'white', onPress}: IProps) => {
  return (
    <>
      <Pressable onPress={onPress} disabled={disabled ? true: false} style={{ width: '100%', height: 50, backgroundColor: disabled ? '#E8F9F4': backgroundColor, borderRadius, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant='body' style={{ fontSize: 17, color: disabled ? Colors.brandColor: textColor }}>{label}</Text>
      </Pressable>
      {/* <Button label={label} disabled={disabled} size={size} borderRadius={borderRadius} backgroundColor={backgroundColor} textColor={textColor} onPress={onPress} labelStyle={{ fontFamily: 'AT-Regular'}} /> */}
    </>
  )
}

export default CustomButton