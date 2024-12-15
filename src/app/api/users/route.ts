import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '@/util/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(request: NextRequest) {
    try {
        const { action, email, password, firstName, lastName, phoneNum } = await request.json();

        if (!action || !email || !password) {
            return NextResponse.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
        }

        if (action === 'signup') {
            const existingUser = await db.user.findUnique({ where: { email } });
            if (existingUser) {
                return NextResponse.json({ success: false, message: 'User already exists.' }, { status: 400 });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await db.user.create({
                data: {
                    email,
                    phoneNum,
                    password: hashedPassword,
                    firstName,
                    lastName,
                    roleType: 'EMPLOYEE',
                },
            });

            return NextResponse.json({ success: true, user: newUser }, { status: 201 });
        } else if (action === 'login') {
            const user = await db.user.findUnique({ where: { email } });
            if (!user) {
                return NextResponse.json({ success: false, message: 'Invalid email or password.' }, { status: 401 });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return NextResponse.json({ success: false, message: 'Invalid email or password.' }, { status: 401 });
            }

            const token = jwt.sign({ id: user.id, email: user.email, role: user.roleType }, JWT_SECRET, {
                expiresIn: '1h',
            });

            return NextResponse.json({ success: true, token }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: 'Invalid action.' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error.' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const email = request.nextUrl.searchParams.get('email');

        if (!email) {
            return NextResponse.json({ success: false, message: 'Email is required.' }, { status: 400 });
        }

        const user = await db.user.findUnique({
            where: { email },
            select: { id: true, firstName: true, lastName: true, email: true, phoneNum: true, roleType: true }
        });

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
        }

        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error.' }, { status: 500 });
    }
}


export async function PUT(request: NextRequest) {
    try {
        const { email, firstName, lastName, phoneNum, password, newPassword } = await request.json();

        if (!email || (!firstName && !lastName && !phoneNum && !password && !newPassword)) {
            return NextResponse.json({ success: false, message: 'Missing required fields for update.' }, { status: 400 });
        }

        const user = await db.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
        }

        // Update password if new password is provided
        let updatedPassword = user.password;
        if (newPassword) {
            updatedPassword = await bcrypt.hash(newPassword, 10);
        }

        // Update user data
        const updatedUser = await db.user.update({
            where: { email },
            data: {
                firstName: firstName || user.firstName,
                lastName: lastName || user.lastName,
                phoneNum: phoneNum || user.phoneNum,
                password: updatedPassword, // Only update if newPassword provided
            },
        });

        return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error.' }, { status: 500 });
    }
}