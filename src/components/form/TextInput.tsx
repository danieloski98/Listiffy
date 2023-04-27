import { TextInputProps, TextInput, StyleSheet, Alert } from 'react-native'
import { Controller, useFormContext } from 'react-hook-form';
import React from 'react'
import { Colors, TextField } from 'react-native-ui-lib';
import { View, Text } from '..';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../Theme/theme';

interface IProps {
    required?: boolean;
    name: string;
    placeholder: string;
    leftIcon: JSX.Element;
    rightIcon?: JSX.Element;
    isPassword?: boolean;
}

export const CustomTextInput = (props: IProps & TextInputProps) => {
    const [focused, setFocused] = React.useState(false);
    const theme = useTheme<Theme>();

    // form context
    const { control, formState: { errors }} = useFormContext();
  return (
    <View>
      <Controller 
        control={control}
        rules={{
            required: props.required || false,
        }}
        name={props.name}
        render={({ field: { onChange, value  }}) => {
            return (
                <View style={[Style.parent, { borderColor: focused ? theme.colors.brandColor : 'grey', ...props.style as any}]}>
                    {props.leftIcon}
                    <View style={{ flex: 1, justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 10 }}>
                        {focused && <Text variant='xs'>{props.placeholder || props.name}</Text>}
                        <TextInput  placeholder={!focused ? props.placeholder || props.name: ''} value={value} onChangeText={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}  secureTextEntry={props.isPassword || false} />
                    </View>
                    {props.rightIcon && props.rightIcon}
                </View>
            )
        }}
      />
      {errors[props.name] && <Text variant='xs' style={{ color: 'red' }}>errors[props.name]</Text>}
    </View>
  )
}

const Style = StyleSheet.create({
    parent: {
        width: '100%',
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    textInput: {
        width: '100%',
        marginBottom: 10
    }
});

// export CustomTextInput