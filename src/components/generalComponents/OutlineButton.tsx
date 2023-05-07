import React from 'react'
import { Button, Colors } from 'react-native-ui-lib'

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
    <Button outline outlineColor={outlineColor || Colors.brandColor} label={label} disabled={disabled} size={size} borderRadius={borderRadius} backgroundColor="white" textColor={textColor} onPress={onPress} labelStyle={{ fontFamily: 'AT-Regular'}} />
  )
}

export default CustomOutlineButton