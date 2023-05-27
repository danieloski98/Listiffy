import React from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { Pressable } from 'react-native';
import { Colors, Button } from 'react-native-ui-lib'
import { Text } from '../'

interface IProps {
    onSubmit: (data: any) => void;
    label: string;
    isLoading?: boolean;
}



export const SubmitButton = ({ onSubmit, label, isLoading }: IProps ) => {
    const { handleSubmit, formState: { isDirty, isValid, isSubmitting } } = useFormContext();

  return (
    <>
       <Pressable onPress={handleSubmit(onSubmit)} disabled={!isDirty || !isValid  ? true: false} style={{ width: '100%', height: 50, backgroundColor: !isDirty || !isValid ? '#E8F9F4': Colors.brandColor, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant='body' style={{ fontSize: 17, color: !isDirty || !isValid ? '#97E1CB': 'white' }}>{isLoading ? 'submitting...':label}</Text>
      </Pressable>
    </>

  )
}
