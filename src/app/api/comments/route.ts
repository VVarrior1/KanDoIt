import { NextRequest, NextResponse } from 'next/server';
import db from "@/util/db";

// Helper function to check comment ownership
async function isCommentOwner(id: number, user_id: number): Promise<boolean> {
    const count = await db.comment.count({
        where: {
            id,
            user_id,
        },
    });
    return count > 0;
}

// Retrieve comments (access based on user type)
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const user_id = searchParams.get("user_id");
        const roleType = searchParams.get("roleType");

        if (!user_id || !roleType) {
            return NextResponse.json(
                { message: "User ID and roleType are required" },
                { status: 400 }
            );
        }

        let comments;

        if (roleType === "Admin") {
            comments = await db.comment.findMany();
        } else if (roleType === "Manager") {
            comments = await db.comment.findMany({
                where: {
                    user_id: parseInt(user_id) },
            });
        } else if (roleType === "Employee") {
            comments = await db.comment.findMany({
                where: {
                    task: { employee_id: parseInt(user_id) },
                },
                include: { task: true },
            });
        } else {
            return NextResponse.json(
                { message: "Invalid roleType" },
                { status: 400 }
            );
        }

        return NextResponse.json(comments, {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error retrieving comments:", error);
        return NextResponse.json(
            { message: "Error retrieving comments" },
            { status: 500 }
        );
    }
}

// Create a comment (all users)
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { task_id, user_id, message } = body;

        if (!task_id || !user_id || !message) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const newComment = await db.comment.create({
            data: {
                task_id,
                user_id,
                message,
            },
        });

        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        console.error("Error creating comment:", error);
        return NextResponse.json(
            { message: "Error creating comment" },
            { status: 500 }
        );
    }
}

// Delete comment (role-based access)
export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, user_id, roleType } = body;

        if (!id || !user_id || !roleType) {
            return NextResponse.json(
                { message: "Comment ID, user ID, and roleType are required" },
                { status: 400 }
            );
        }

        const isOwner = await isCommentOwner(id, parseInt(user_id));

        // Employees and managers can only delete their own comments
        if (roleType !== "Admin" && !isOwner) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 403 }
            );
        }

        await db.comment.delete({
            where: { id },
        });

        return NextResponse.json(
            { message: "Comment deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting comment:", error);
        return NextResponse.json(
            { message: "Error deleting comment" },
            { status: 500 }
        );
    }
}

// Update comment's message (role-based access)
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, task_id, user_id, roleType, message } = body;

        if (!id || !user_id || !roleType || !message) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const isOwner = await isCommentOwner(id, parseInt(user_id));

        // Employees and managers can only update their own comments
        if (roleType !== "Admin" && !isOwner) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 403 }
            );
        }

        const updatedComment = await db.comment.update({
            where: { id },
            data: { message },
        });

        return NextResponse.json(updatedComment, { status: 200 });
    } catch (error) {
        console.error("Error updating comment:", error);
        return NextResponse.json(
            { message: "Error updating comment" },
            { status: 500 }
        );
    }
}
