import { NextResponse } from 'next/server';
import '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import { User } from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;
        
        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
        }

        const tokenData = { 
            id: user._id, 
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1h' });

        const response = NextResponse.json({ message: 'Login successful'}, { status: 200 });

        response.cookies.set('token', token, {
            httpOnly: true,
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
