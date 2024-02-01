import React from 'react'
import JobListItem from './JobListItem'
import { db } from '@/lib/db'

import { Prisma } from '@prisma/client'
import { JobFilterValues } from '@/lib/validations'

interface JobResultsProps {
  filterValues: JobFilterValues
}

async function JobResults({
  filterValues: { q, type, location, remote },
}: JobResultsProps) {
  const searchString = q
  // ?.split(' ')
  // .filter((word) => word.length > 0)
  // .join(' & ')

  //Search filter using OR does not work with mongodb, other filters ok

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [],
      }
    : {}

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: 'Remote' } : {},
      { approved: true },
    ],
  }

  const jobs = await db.job.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
  })
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobListItem job={job} key={job.id} />
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
    </div>
  )
}

export default JobResults
