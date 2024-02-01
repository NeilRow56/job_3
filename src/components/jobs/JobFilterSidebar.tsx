import { JobFilterValues, jobFilterSchema } from '@/lib/validations'
import { redirect } from 'next/navigation'
import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Select from '../ui/select'
import { jobTypes } from '@/lib/job-types'
import { db } from '@/lib/db'
import { Button } from '../ui/button'
import FormSubmitButton from '../FormSubmitButton'

async function filterJobs(formData: FormData) {
  'use server'

  const values = Object.fromEntries(formData.entries())

  const { q, type, location, remote } = jobFilterSchema.parse(values)

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: 'true' }),
  })

  redirect(`/?${searchParams.toString()}`)
}

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues
}

async function JobFilterSidebar({ defaultValues }: JobFilterSidebarProps) {
  const distinctLocations = (await db.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ['location'],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean)
    )) as string[]

  return (
    <aside className="rounded:lg sticky top-0 h-fit border bg-background md:w-[260px]">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Title, company, etc."
              defaultValue={defaultValues.q}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValues.type || ''}
            >
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues.location || ''}
            >
              <option value="">All locations</option>

              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              defaultChecked={defaultValues.remote}
              className="mx-2 scale-125 accent-black"
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <FormSubmitButton className="w-full">Filter jobs</FormSubmitButton>
        </div>
      </form>
    </aside>
  )
}

export default JobFilterSidebar
