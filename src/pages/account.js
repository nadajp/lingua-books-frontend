import { useState, useEffect, useContext } from 'react'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import axios from 'axios'

export default withPageAuthRequired(function Account() {
    const { user, isLoading } = useUser();
    const [username, setUsername] = useState('');
    
    if (isLoading) return <div className="text-white">Loading...</div>;
    
    const handleSubmit = async(e) => {
        e.preventDefault();
    
        const account = {
          username,
        };
    
      };

    return (
        <div className="flex justify-center min-h-screen mt-2">
        <div className="w-2/3 p-2 rounded shadow-lg">
            <h1 className="text-3xl text-center font-bold mb-2">My Account</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Email:  {user.email}</label>
                </div>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username: </label>
                    <input onChange={(e) => setUsername(e.target.value)}
                        type="text" 
                        id="displayName" 
                        className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                        defaultValue={user.nickname} 
                    />
                </div>
        
                <button 
                    type="submit" 
                    className="block mx-auto bg-gray-500 text-yellow-300 rounded-md py-2 px-10 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-opacity-50"
                >
                    Save
                </button>
            </form>
            </div>
    </div>   
    )
})
