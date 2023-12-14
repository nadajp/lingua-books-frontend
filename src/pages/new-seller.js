import { useState } from 'react';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';

export default function NewSellerForm() {
  const [displayName, setDisplayName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('US');
  const [stateLabel, setStateLabel] = useState('State'); // Default value can be 'State' or 'Province' as per your preference

  const allowedCountries = ['US', 'CA'];

  const countries = Country.getAllCountries()
    .filter(country => allowedCountries.includes(country.isoCode));

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    setStateLabel(countryCode === 'US' ? 'State' : 'Province');
    setState(''); // Reset state selection when country changes
  };
    
  const states = country ? State.getStatesOfCountry(country) : [];

  const handleSubmit = async(e) => {
    e.preventDefault();

    const sellerData = {
      displayName,
      city,
      state,
      country
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
      <div className="w-2/3 p-8 rounded shadow-lg">
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
              className="mt-2 p-2 w-1/2 border rounded focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <select value={country} onChange={handleCountryChange} className="mr-2">
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
              </option>
              ))}
            </select>

            <select value={state} onChange={e => setState(e.target.value)}>
              <option value="">Select {stateLabel}</option>
              {states.map(state => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
              </option>
              ))}
            </select>
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
              className="mt-2 p-2 w-1/2 border rounded focus:border-blue-400 focus:outline-none"
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
