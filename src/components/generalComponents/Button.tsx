import React from 'react'
import { Button, Colors } from 'react-native-ui-lib'

interface IProps {
    disabled?: boolean;
    size?: 'xSmall' | 'small' | 'medium' | 'large';
    borderRadius?: number;
    onPress?: () => void;
    backgroundColor?: string;
    textColor?: string;
    label: string;
}

const CustomButton = ({ label, disabled = false, size = 'large', borderRadius = 10, backgroundColor = Colors.brandColor, textColor = 'white', onPress}: IProps) => {
  return (
    <Button label={label} disabled={disabled} size={size} borderRadius={borderRadius} backgroundColor={backgroundColor} textColor={textColor} onPress={onPress} />
  )
}

export default CustomButton