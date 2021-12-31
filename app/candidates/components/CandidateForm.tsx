import { Form, FormProps } from "app/core/components/Form"
import { LabeledSelectField } from "app/core/components/LabeledSelectField"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
import { STEPS } from "./CandidateStepForm"
export { FORM_ERROR } from "app/core/components/Form"

export function CandidateForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="interviewed_at" label="Interview Date" placeholder="" type="date" />
      <LabeledSelectField name="step" label="Step" placeholder="" options={STEPS} />
    </Form>
  )
}
