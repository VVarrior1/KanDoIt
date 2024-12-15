'use client'
import Card from '@/app/components/Card';
import { useQuery } from '@tanstack/react-query';
import type { Task } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function Page() {
    const params = useParams();
    const projectId = params.id || localStorage.getItem('projectId');
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    // Get user email from localStorage
    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            setUserEmail(email);
        }
    }, []);

    // Fetch user details when email is available
    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!userEmail) return;
            
            try {
                const response = await fetch(`/api/users?email=${encodeURIComponent(userEmail)}`);
                if (!response.ok) throw new Error('Failed to fetch user details');
                
                const data = await response.json();
                if (data.user) {
                    setUserId(data.user.id.toString());
                    setUserRole(data.user.roleType);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [userEmail]);

    const { data: tasks = [], isLoading, error } = useQuery<Task[]>({
        queryKey: ['project-tasks', projectId, userId],
        queryFn: async () => {
            if (!projectId || !userId) return [];
            
            const url = `/api/projects/${projectId}/tasks?userId=${userId}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            
            return response.json();
        },
        enabled: !!projectId && !!userId
    });

    if (!projectId) return <div className="p-4 text-center">No project selected</div>;
    if (!userId) return <div className="p-4 text-center">No user found</div>;
    if (isLoading) return <div className="p-4 text-center">Loading...</div>;
    if (error) return <div className="p-4 text-center text-red-500">Error: {error.toString()}</div>;

    const columns = [
        { heading: "last week", priority: "HIGH" },
        { heading: "this week", priority: "MEDIUM" },
        { heading: "next week", priority: "LOW" }
    ];

    const canCreateTask = userRole === 'MANAGER' || userRole === 'ADMIN';

    return (
        <div className="w-full p-4 md:p-8 lg:p-14">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {columns.map(({ heading, priority }) => {
                    const filteredTasks = tasks.filter(t => t.taskPriority === priority);
                    
                    return (
                        <KanBanColumn
                            key={heading}
                            heading={heading}
                            tasks={filteredTasks}
                        />
                    );
                })}
            </div>

            {canCreateTask && (
                <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
                        onClick={() => alert('Create Task Button Clicked')}
                    >
                        Create Task
                    </button>
                </div>
            )}
        </div>
    );
}

function KanBanColumn({
    heading,
    tasks,
}: {
    heading: string;
    tasks: Task[];
}) {
    const boxColorMap = {
        "last week": "bg-gray-300",
        "this week": "bg-purple-300",
        "next week": "bg-red-300"
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className={`rounded-full ${boxColorMap[heading as keyof typeof boxColorMap]} text-white text-center px-4 py-2 mb-4 mx-auto md:mx-0 w-fit`}>
                <span className="font-semibold">{heading}</span>
            </div>
            {tasks && tasks.length > 0 ? (
                tasks.map((task) => (
                    <Card
                        key={task.id}
                        id={task.id.toString()}
                        title={task.taskName}
                        description={task.taskType || 'No description'}
                        dueDate={task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                        tasks={[]}
                        completedTasks={[]}
                    />
                ))
            ) : (
                <div className="text-gray-500 text-center p-4 bg-gray-50 rounded-lg">
                    No tasks available for {heading}
                </div>
            )}
        </div>
    );
}