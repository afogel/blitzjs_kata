import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { Label, TextInput } from "flowbite-react"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  sizing?: "sm" | "md" | "lg"
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, labelProps, name, sizing = "md", ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()

    return (
      <div {...outerProps}>
        <div className="my-2 inline-block">
          <Label htmlFor={name} {...labelProps}>
            {label}
          </Label>
        </div>
        <TextInput
          disabled={isSubmitting}
          sizing={sizing}
          helperText={
            <ErrorMessage
              render={({ message }) => (
                <span role="alert" className="text-red-600">
                  {message}
                </span>
              )}
              errors={errors}
              name={name}
            />
          }
          {...register(name)}
          {...props}
        />
      </div>
    )
  }
)

export default LabeledTextField
