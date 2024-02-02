import { z } from 'zod'
import { jobTypes, locationTypes } from './job-types'

// Variables create for requiredString and companyLogoSchema
const requiredString = z.string().min(1, 'Required')

const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg']
const MAX_IMAGE_SIZE = 4 //In MegaBytes

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024)
  return +result.toFixed(decimalsNum)
}

const numericRequiredString = requiredString.regex(/^\d+$/, 'Must be a number')

const companyLogoSchema = z.object({
  companyLogo: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0
    }, 'Image is required')
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE
      )
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      )
    }, 'File type is not supported'),
})

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal('')),
    applicationUrl: z.string().max(100).url().optional().or(z.literal('')),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: 'Email or url is required',
    path: ['applicationEmail'],
  })

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      'Invalid location type'
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === 'Remote' || data.location,
    {
      message: 'Location is required for on-site jobs',
      path: ['location'],
    }
  )

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      'Invalid job type'
    ),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericRequiredString.max(
      9,
      "Number can't be longer than 9 digits"
    ),
  })
  .and(applicationSchema)
  .and(locationSchema)

export type CreateJobValues = z.infer<typeof createJobSchema>

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
})

export type JobFilterValues = z.infer<typeof jobFilterSchema>
