import { useState } from 'react';
import axios from 'axios';

export default function NewSellerForm() {
  const [displayName, setDisplayName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    const sellerData = {
      displayName,
      city,
      state,
    };

    try {
      const response = await axios.post('/api/stripe/connect-stripe', sellerData);
      if (response.data.url) {
        window.location.href = response.data.url;
      }
      setDisplayName('');
    } catch (error) {
      console.error('Error registering seller', error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-1/2 p-8 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Become a Seller</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="displayName">
              Seller Display Name:
            </label>
            <input 
              id="displayName" 
              type="text" 
              value={displayName} 
              onChange={(e) => setDisplayName(e.target.value)} 
              required 
              className="mt-2 p-2 w-full border rounded focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium" htmlFor="city">
              City:
            </label>
            <input 
              id="city" 
              type="text" 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
              required 
              className="mt-2 p-2 w-full border rounded focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium" htmlFor="state">
              State:
            </label>
            <input 
              id="state" 
              type="text" 
              value={state} 
              onChange={(e) => setState(e.target.value)} 
              required 
              className="mt-2 p-2 w-full border rounded focus:border-blue-400 focus:outline-none"
            />
          </div>

          <p className="text-gray-600">
            In order to receive payments, you will need to connect with the Stripe payment system. Please click the link below to complete your Stripe profile.
          </p>

          <button 
            type="submit" 
            className="bg-gray-500 text-yellow-300 rounded-md p-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-opacity-50"
          >
            Connect With Stripe
          </button>
        </form>
      </div>
    </div>
  );
}
