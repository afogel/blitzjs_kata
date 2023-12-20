import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"
import { Label, Select, SelectProps } from "flowbite-react"

export interface SelectOption {
  label: string
  value: string
}

export interface LabeledSelectFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  options: SelectOption[]
  selectProps?: SelectProps
}

export const LabeledSelectField = forwardRef<HTMLInputElement, LabeledSelectFieldProps>(
  ({ label, outerProps, labelProps, name, options, selectProps }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()

    return (
      <div className="max-w-md" {...outerProps}>
        <div className="mb-2 block">
          <Label htmlFor={name} {...labelProps}>
            {label}
          </Label>
        </div>
        <Select required {...selectProps} {...register(name)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
    )
  }
)

export default LabeledSelectField
