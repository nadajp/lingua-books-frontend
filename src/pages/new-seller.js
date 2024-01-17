import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import { Country, State } from 'country-state-city';

export default function NewSellerForm({locationData}) {
  const { user, error, isLoading } = useUser();
  const [displayName, setDisplayName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('US');
  const [stateLabel, setStateLabel] = useState('State'); 
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!isLoading && !error && user.nickname?.length > 0) {
        setDisplayName(user.nickname);
    }
  }, [isLoading, error, user]);

  useEffect(() => {
    if (locationData) {
      setCountry(locationData.country_code || 'US'); // Set default or detected country
      setState(locationData.area || ''); // Set default or detected state
      setCity(locationData.city_name || ''); // Set default or detected city
    }
  }, [locationData]); // This useEffect runs only when locationData changes
  
  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red">{error.message}</div>;
  
  const allowedCountries = ['US', 'CA'];

  const countries = Country.getAllCountries()
    .filter(country => allowedCountries.includes(country.isoCode));

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    setStateLabel(countryCode === 'US' ? 'State' : 'Province');
    setState(''); 
  };
    
  const states = country ? State.getStatesOfCountry(country) : [];

  const handleSubmit = async(e) => {
    e.preventDefault();

    const errors = validateInputs(displayName, city);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  
    setFormErrors({});

    const sellerData = {
      displayName,
      city,
      state,
      country
    };

    axios.post('/api/stripe/connect-stripe', sellerData)
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          setFormErrors(data.errors);
        } else if (response.data.url) {
          window.location.href = response.data.url;
          setDisplayName('');
        }
      })
      .catch(error => {
        console.error('Error registering seller', error);
      });
  };

  function validateInputs(displayName, city) {
    const errors = {};
    const alphaRegex = /^[A-Za-z ]+$/;
  
    if (!displayName || displayName.length < 2 || displayName.length > 50 || !alphaRegex.test(displayName)) {
      errors.displayName = "Display name must be between 2 and 50 alphabetic characters.";
    }
    if (!city || city.length < 2 || city.length > 100 || !alphaRegex.test(city)) {
      errors.city = "City name must be between 2 and 100 alphabetic characters.";
    }
    return errors;
  }
  
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
            {formErrors.displayName && <div className="error">{formErrors.displayName}</div>}
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
            {formErrors.city && <div className="error">{formErrors.city}</div>}
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

export async function getServerSideProps({ req }) {
  let userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (userIp.substr(0, 7) == "::ffff:") {
    userIp = userIp.substr(7)
  }
  let locationData = null;
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_GEO_REST_API_ENDPOINT}&ip=${userIp}`);
    if (response.status === 200) {
      locationData = response.data;
    }
    console.log('Location data: ', locationData);
    } catch (error) {
      console.error('Error fetching IP info:', error);
    }
    return { props: { locationData } };
}
