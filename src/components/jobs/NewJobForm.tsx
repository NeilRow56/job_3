'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { CreateJobValues, createJobSchema } from '@/lib/validations'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import H1 from '../shared/H1'
import { Input } from '../ui/input'

type NewJobFormProps = {}

const NewJobForm = (props: NewJobFormProps) => {
  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobSchema),
  })

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: CreateJobValues) {
    alert(JSON.stringify(values, null, 2))
  }
  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div>
        <H1>Find your perfect developer</H1>
        <p>Get your job posting seen by thousands of job seekers</p>
      </div>
      <div className="space-y-6 rounded-lg border p-4">
        <div>
          <h2 className="font-semibold"> Job Details </h2>
          <p className="text-muted-foreground">
            Provide a job description and details
          </p>
        </div>
        <Form {...form}>
          <form
            className="space-y-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </main>
  )
}

export default NewJobForm
