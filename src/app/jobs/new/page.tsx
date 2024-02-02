import NewJobForm from '@/components/jobs/NewJobForm'
import { Metadata } from 'next'

// We can only export metadata from a server component

export const metadata: Metadata = {
  title: 'Post a new job',
}

export default function newJobPage() {
  return <NewJobForm />
}
