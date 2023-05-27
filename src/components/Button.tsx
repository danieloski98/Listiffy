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
    <>
      <Pressable onPress={onPress} disabled={disabled ? true: false} style={{ width: '100%', height: 50, backgroundColor: disabled ? 'lightgrey': backgroundColor || Colors.black, borderRadius, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant='body' style={{ fontSize: 17, color: color || Colors.white }}>{isLoading ? 'submitting...':label}</Text>
      </Pressable>
    </>
  );
};
