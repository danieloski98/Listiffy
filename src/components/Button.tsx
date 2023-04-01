import { useTheme } from "@shopify/restyle";
import React from "react";
import { Pressable, ActivityIndicator } from 'react-native'
import { Theme } from "../Theme/theme";
import { Text } from "./Text";
import { Button, Colors } from "react-native-ui-lib";

interface IProps {
  label: string;
  disabled?: boolean;
  isLoading?: boolean;
  backgroundColor?: string;
  size?: "large" | "mediumn" | "small" | "xSmall";
  borderRadius?: number;
  color?: string;
  onPress: () => void;
}

export const CustomButton = ({
  label,
  isLoading = false,
  backgroundColor,
  borderRadius = 5,
  color,
  onPress,
  disabled
}: IProps) => {
  const theme = useTheme<Theme>();
  return (
    <Button onPress={onPress} label={isLoading ? 'submitting...':label} disabled={disabled || false} size={Button.sizes.large} backgroundColor={backgroundColor || Colors.black}  borderRadius={5} />
      // <Pressable 
      // onPress={() => onPress()}
      // style={{
      //   width: '100%',
      //   height: 48,
      //   backgroundColor: backgroundColor || theme.colors.brandColor,
      //   borderRadius: borderRadius,
      //   justifyContent: 'center',
      //   alignItems: 'center',
      // }}>
      //   {!isLoading && <Text variant='xs' style={{ color }}>{label}</Text>}
      //   {isLoading && <ActivityIndicator size='large' color={theme.colors.brandColor} />}
      // </Pressable>
  );
};
