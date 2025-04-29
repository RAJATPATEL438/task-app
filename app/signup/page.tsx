"use client"

import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation';

export default function SignUp() {
    interface FormInputs {
    email: string;
    password: string;
    }

    const { register, handleSubmit, formState: { errors }} = useForm<FormInputs>();
    const router = useRouter();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
            console.log('Server Response:', result);
    
            if (response.ok) {
                router.push('/login');
            } else {
                alert(result.message || 'Signup failed!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while signing up.');
        }
    };

    return(
        <div className="flex items-center justify-center h-screen bg-gray-100 text-black p-4">
      
            <div className="w-full max-w-sm p-10 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', { required: 'Email is required', pattern: { value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, message: 'Invalid email address' } })}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
                <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
                    Submit
                </button>
            </form>
            </div>
        </div>
    )
}