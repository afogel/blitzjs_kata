import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { Label, Textarea } from "flowbite-react"

export interface LabeledTextAreaFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const LabeledTextAreaField = forwardRef<HTMLInputElement, LabeledTextAreaFieldProps>(
  ({ label, outerProps, labelProps, name }, ref) => {
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
        <Textarea
          disabled={isSubmitting}
          rows={4}
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
        />
      </div>
    )
  }
)

export default LabeledTextAreaField
