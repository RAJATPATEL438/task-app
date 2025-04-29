import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    try{
        const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
        response.cookies.set('token', '', { httpOnly: true, expires: new Date(0)});
        return response;
    }
    catch (error) { 
        console.error('Error logging out:', error);
        return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
    }
}