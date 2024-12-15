'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import type { Project } from '@prisma/client'

export default function Home() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>('')
  const [userRole, setUserRole] = useState<string>('') // State to store the user role

  const router = useRouter()

  // Retrieve email from localStorage and fetch user's name and role on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('email')
    if (storedEmail) {
      setUserEmail(storedEmail)

      // Fetch user's name and role based on email
      const fetchUserNameAndRole = async () => {
        const response = await fetch(`/api/users?email=${storedEmail}`)
        const data = await response.json()

        if (response.ok && data.user) {
          setUserName(`${data.user.firstName} ${data.user.lastName}`)
          setUserRole(data.user.roleType) // Set the user role
        }
      }

      fetchUserNameAndRole()
    }
  }, [])

  // Fetch projects related to the user
  const { data: projects, error } = useQuery<Project[], Error>({
    queryKey: ['projects', userEmail],
    queryFn: async () => {
      if (userEmail) {
        return await fetch(`/api/projects?email=${userEmail}`).then(res => res.json())
      }
      return []
    },
    enabled: !!userEmail, // Only run this query when the email is available
  })

  if (error) {
    console.error(error)
  }

  useEffect(() => {
    if (projects && projects.length > 0) {
      // Extract project IDs and store them in localStorage
      const projectIds = projects.map(project => project.id)
      localStorage.setItem('projectIds', JSON.stringify(projectIds))
    }
  }, [projects])

  return (
    <div className="h-full w-full min-h-screen">
      <div className="h-full w-full flex flex-col p-10 prose max-w-full max-h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold m-0">Hi, {userName || 'Loading...'}</h1>
          {userRole !== 'EMPLOYEE' && ( // Only show the Create Project button if the user is not an employee
            <Link
              href="/create-project"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2 no-underline"
            >
              <span>+</span>
              <span>Create Project</span>
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects && projects.length > 0 ? (
            projects.map((prj) => (
              <Link
                key={prj.id}
                href={`/projects/${prj.id}`}
                className="no-underline"
              >
                <div className="btn btn-primary rounded-md w-full p-4 text-left hover:bg-opacity-90 transition-colors">
                  {prj.projectName}
                </div>
              </Link>
            ))
          ) : (
            <p>No projects found</p>
          )}
        </div>
      </div>
    </div>
  )
}
