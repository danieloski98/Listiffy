import { TextInputProps, TextInput, StyleSheet } from 'react-native'
import { Control, Controller } from 'react-hook-form';
import { View, Text } from 'react-native-ui-lib';
import React from 'react'
import { Colors } from 'react-native-ui-lib';
import { useFormContext } from 'react-hook-form'

interface IProps {
    control: Control<any>;
    required?: boolean;
    name: string;
    placeholder: string;
    leftIcon: JSX.Element;
    rightIcon?: JSX.Element;
    isPassword?: boolean;
}

export const CustomTextInput = (props: IProps & TextInputProps) => {
    const [focused, setFocused] = React.useState(false);

    // form context
    const { formState: { errors }} = useFormContext();
  return (
    <View>
      <Controller 
        control={props.control}
        rules={{
            required: props.required || false,
        }}
        name={props.name}
        render={({ field: { onChange, value }}) => (
            <View style={[Style.parent, { borderColor: focused ? Colors.brandColor:'grey'}]}>
                {props.leftIcon}
                <View style={{ flex: 1, justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 10 }}>
                    {focused && <Text light style={{ fontSize: 12 }}>{props.placeholder || props.name}</Text>}
                    <TextInput placeholder={!focused ? props.placeholder || props.name: ''} style={Style.textInput} value={value} onChangeText={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} secureTextEntry={props.isPassword || false} />
                </View>
                {props.rightIcon && props.rightIcon}
            </View>
        )}
      />
      {errors[props.name] && <Text light>errors[props.name]</Text>}
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