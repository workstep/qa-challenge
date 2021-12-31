import { Form, FormProps } from "app/core/components/Form"
import { LabeledSelectField } from "app/core/components/LabeledSelectField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export const STEPS = ["Background Check", "Drug Test", "Paperwork"]

export function CandidateStepForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledSelectField
        className="p-2 pr-8 border border-gray-350 rounded-lg uppercase font-semibold text-gray-450 text-sm"
        name="step"
        label=""
        placeholder=""
        options={["", ...STEPS]}
        onChange={(e) => props.onSubmit({ step: e.target.value })}
      />
    </Form>
  )
}
