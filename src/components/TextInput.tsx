import { TextInputProps, TextInput, StyleSheet, Alert } from 'react-native'
import { Controller, useFormContext } from 'react-hook-form';
import React from 'react'
import { View, Text } from '.';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../Theme/theme';

interface IProps {
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    isPassword?: boolean;
}

export const CustomInput = (props: IProps & TextInputProps) => {
    const [focused, setFocused] = React.useState(false);
    const theme = useTheme<Theme>();

    return (
        <View>
            <View style={[Style.parent, { borderColor: focused ? theme.colors.brandColor : 'grey', }]}>
                {props.leftIcon && props.leftIcon}
                <View style={{ flex: 1, justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 10 }}>
                    <TextInput {...props} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} secureTextEntry={props.isPassword || false} />
                </View>
                {props.rightIcon && props.rightIcon}
            </View>
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

