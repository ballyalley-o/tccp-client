import FormTextField from './form-text-field'
import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'

type FormPasswordFieldProps<T extends FieldValues> = Omit<ComponentProps<typeof FormTextField<T>>, 'type'>

const FormPasswordField = <T extends FieldValues>(props: FormPasswordFieldProps<T>) => {
  return (
    <FormTextField
      {...props}
      type="password"
      autoComplete={props.autoComplete || 'current-password'}
    />
  )
}

export default FormPasswordField
