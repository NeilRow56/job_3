'use client'

import { FormInput } from './FormInput'
import { FormSubmit } from './FormSubmit'

const Form = () => {
  return (
    <form action={() => {}} className="my-4 space-y-4">
      <div className="space-y-4">
        <FormInput
          id="title"
          label="Todo title"
          type="text"
          placeholder="To do..."
        />
      </div>
      <FormSubmit className="w-full text-slate-100">Create</FormSubmit>
    </form>
  )
}

export default Form
