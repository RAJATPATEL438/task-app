"use client";

import { useRouter } from 'next/navigation';

export default function Profile() {

    const router = useRouter();

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

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 text-black p-4">
            <div className="w-full max-w-sm p-10 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
                <p className="text-center">Welcome to your profile page!</p>
                <button onClick={logout} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                    Logout   
                </button>
            </div>
        </div>
    );
}