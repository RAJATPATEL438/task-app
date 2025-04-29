"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Profile() {

    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                router.push('/login');
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const getUserData = async () => {
        try {
            const response = await fetch('/api/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const result = await response.json();
                setData(result.data._id);
            } else {
                console.error('Failed to fetch user data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 text-black p-4">
            <div className="w-full max-w-sm p-10 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
                <p className="text-center">Welcome to your profile page!</p>
                <h2 className="text-center mt-2">{data==="nothing"?"Nothing":<Link className='text-blue-500 underline' href={`/profile/${data}`}>{data}</Link>}</h2>
                <button onClick={logout} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                    Logout   
                </button>
                <button onClick={getUserData} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                    Get User Data
                </button>
            </div>
        </div>
        dsfwf
        hole
    );
}