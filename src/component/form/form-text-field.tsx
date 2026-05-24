import { TextField, type TextFieldProps } from '@mui/material'
import { useController, type Control, type FieldPath, type FieldValues } from 'react-hook-form'

type FormTextFieldProps<T extends FieldValues> = Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'error'> & {
  control: Control<T>
  name   : FieldPath<T>
}

const FormTextField = <T extends FieldValues>({ control, name, helperText, ...props }: FormTextFieldProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return (
    <TextField
      {...props}
      {...field}
      error={Boolean(error)}
      helperText={error?.message || helperText}
    />
  )
}

export default FormTextField
