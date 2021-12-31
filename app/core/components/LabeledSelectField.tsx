import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"

export interface LabeledSelectFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["select"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  options: string[]
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const LabeledSelectField = forwardRef<HTMLSelectElement, LabeledSelectFieldProps>(
  ({ label, outerProps, labelProps, name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]

    return (
      <div {...outerProps}>
        <label {...labelProps}>
          {label}
          <select {...register(name)} {...props}>
            {props.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        {error && (
          <div role="alert" style={{ color: "red" }}>
            {error}
          </div>
        )}

        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-size: 1rem;
          }
          input {
            font-size: 1rem;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            border: 1px solid purple;
            appearance: none;
            margin-top: 0.5rem;
          }
        `}</style>
      </div>
    )
  }
)

export default LabeledSelectField
