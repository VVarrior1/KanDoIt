// app/api/projects/[id]/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/util/db";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const projectId = parseInt(params.id);
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        // Get user to check role
        const user = await db.user.findUnique({
            where: { id: parseInt(userId) }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // If user is MANAGER or ADMIN, return all tasks for the project
        if (user.roleType === 'MANAGER' || user.roleType === 'ADMIN') {
            const tasks = await db.task.findMany({
                where: {
                    project_id: projectId
                },
                include: {
                    employee: true
                }
            });
            return NextResponse.json(tasks);
        }

        // For regular employees, only return their assigned tasks
        const tasks = await db.task.findMany({
            where: {
                project_id: projectId,
                employee_id: parseInt(userId)
            },
            include: {
                employee: true
            }
        });

        return NextResponse.json(tasks);
        
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }
}
// Handle POST request to create a new task
export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const projectId = parseInt(params.id); // Parse project ID from the URL params
        const body = await req.json(); // Parse the request body
        const { taskName, taskPriority, employeeId } = body; // Extract required fields

        // Ensure projectId is a valid number
        if (isNaN(projectId)) {
            return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
        }

        // Validate required fields
        if (!taskName || !employeeId) {
            return NextResponse.json({ error: 'Missing required task fields' }, { status: 400 });
        }

        // Create a new task in the database
        const newTask = await db.task.create({
            data: {
                taskName,
                taskPriority,
                project_id: projectId,
                employee_id: parseInt(employeeId),
                taskProgress: false
            }
        });

        // Return the created task with status 201
        return NextResponse.json(newTask, {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        // Log any errors for debugging
        console.error('Error creating task:', error);

        // Return 500 Internal Server Error in case of unexpected errors
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}