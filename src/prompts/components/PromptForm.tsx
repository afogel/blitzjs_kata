import React from "react"
import { Form, FormProps } from "src/core/components/Form"
import { LabeledTextAreaField } from "src/core/components/LabeledTextAreaField"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { z } from "zod"
export { FORM_ERROR } from "src/core/components/Form"
import HiddenInputField from "src/core/components/HiddenInputField"

export function PromptForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const currentUser = useCurrentUser()
  return (
    <Form<S> {...props}>
      <HiddenInputField name="user.connect.id" value={currentUser?.id} />
      <LabeledTextAreaField name="input" label="Input" placeholder="Input" type="text" />
    </Form>
  )
}
