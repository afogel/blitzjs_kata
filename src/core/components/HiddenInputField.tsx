import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { Label, Textarea } from "flowbite-react"

export interface HiddenInputFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  value: string | number | undefined
}

export const HiddenInputField = forwardRef<HTMLInputElement, HiddenInputFieldProps>(
  ({ value, name }, ref) => {
    const { register } = useFormContext()

    return <input type="hidden" {...register(name)} value={value} />
  }
)

export default HiddenInputField
