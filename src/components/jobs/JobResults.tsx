import React from 'react'
import JobListItem from './JobListItem'
import { db } from '@/lib/db'

async function JobResults() {
  const jobs = await db.job.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobListItem job={job} key={job.id} />
      ))}
    </div>
  )
}

export default JobResults
