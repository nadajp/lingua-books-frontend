import { useState, useEffect, useContext } from 'react'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import axios from 'axios'

export default withPageAuthRequired(function Account() {
    const { user, isLoading } = useUser();

    if (isLoading) return <div className="text-white">Loading...</div>;
    return (
        <div className="flex justify-center items-center min-h-screen">
        <div className="w-2/3 p-8 rounded shadow-lg">
            <h1 className="text-3xl text-center font-bold mb-6">My Account</h1>
            
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                    defaultValue={user.name} 
                />
            </div>
    
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <div className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 p-2">
                    {user.email}
                </div>
            </div>
    
            <button 
                type="button" 
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                Save
            </button>
        </div>
    </div>   
    )
})
