import { TextInputProps, TextInput, StyleSheet, Alert, Pressable } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import React from "react";
import { Colors, TextField } from "react-native-ui-lib";
import { View, Text } from "..";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../Theme/theme";
import { Feather } from "@expo/vector-icons";


interface IProps {
  value: string;
  placeholder: string;
  onPress: () => void;
}

export const CustomSelect = (props: IProps) => {
  return (
    <Pressable onPress={() => props.onPress()} style={[Style.parent, { borderColor: "grey" }]}>
      <Text variant="xs">
        {props.value === "" ? props.placeholder : props.value}
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      ></View>
      <Feather name="chevron-down" size={25} color={Colors.black} />
    </Pressable>
  );
};

const Style = StyleSheet.create({
  parent: {
    width: "100%",
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textInput: {
    width: "100%",
    marginBottom: 10,
  },
});
