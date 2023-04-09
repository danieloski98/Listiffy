import React from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { Colors, Button } from 'react-native-ui-lib'

interface IProps {
    onSubmit: (data: any) => void;
    label: string;
    isLoading?: boolean;
}



export const SubmitButton = ({ onSubmit, label, isLoading }: IProps ) => {
    const { handleSubmit, formState: { isDirty, isValid, isSubmitting } } = useFormContext();

  return (
    <Button onPress={handleSubmit(onSubmit)} label={isLoading ? 'submitting...':label} disabled={!isDirty || !isValid} size={Button.sizes.large} backgroundColor={Colors.black} borderRadius={5} labelStyle={{ fontFamily: 'AT-Regular'}} />
  )
}
