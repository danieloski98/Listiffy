import React from 'react'
import { Pressable } from 'react-native';
import { Button, Colors } from 'react-native-ui-lib'
import { Text } from '../'

interface IProps {
    disabled?: boolean;
    size?: 'xSmall' | 'small' | 'medium' | 'large';
    borderRadius?: number;
    onPress?: () => void;
    outlineColor?: string;
    textColor?: string;
    label: string;
}

const CustomOutlineButton = ({ label, disabled = false, size = 'large', borderRadius = 10, outlineColor = Colors.brandColor, textColor = 'white', onPress}: IProps) => {
  return (
    <>
      <Pressable onPress={onPress} disabled={disabled ? true: false} style={{ width: '100%', height: 50, backgroundColor: 'transparent', borderWidth: 2, borderColor: Colors.brandColor, borderRadius, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant='body' style={{ fontSize: 17, color: Colors.brandColor }}>{label}</Text>
      </Pressable>

      {/* <Button outline outlineColor={outlineColor || Colors.brandColor} label={label} disabled={disabled} size={size} borderRadius={borderRadius} backgroundColor="white" textColor={textColor} onPress={onPress} labelStyle={{ fontFamily: 'AT-Regular'}} /> */}
    </>
    
  )
}

export default CustomOutlineButton