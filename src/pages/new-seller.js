import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios'; // Import axios

export default function NewSellerForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressState, setAddressState] = useState('');
  const [addressZip, setAddressZip] = useState('');
  const [addressCountry, setAddressCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Create a seller object with the form data
    const sellerData = {
      firstName,
      lastName,
      addressStreet,
      addressCity,
      addressState,
      addressZip,
      addressCountry,
      phoneNumber,
    };
    try {
      // Send a POST request to the server with the sellerData
      const response = await axios.post('/api/sellers', sellerData);

      // Handle the response, e.g., show a success message or redirect
      console.log('Seller registration successful', response.data);

    // Reset form fields
    setFirstName('');
    setLastName('');
    setAddressStreet('');
    setAddressCity('');
    setAddressState('');
    setAddressZip('');
    setPhoneNumber('');
    setCountry('');
  } catch (error) {
    // Handle errors, e.g., show an error message
    console.error('Error registering seller', error);
  }
};

  return (
    <div>
      <h2>Become a Seller</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>
        <br />
        <label>
          Address:
          <input type="text" value={addressStreet} onChange={(e) => setAddressStreet(e.target.value)} required />
        </label>
        <br />
        <label>
          City:
          <input type="text" value={addressCity} onChange={(e) => setAddressCity(e.target.value)} required />
        </label>
        <br />
        <label>
          State:
          <input type="text" value={addressState} onChange={(e) => setAddressState(e.target.value)} required />
        </label>
        <br />
        <label>
          Zip Code:
          <input type="text" value={addressZip} onChange={(e) => setAddressZip(e.target.value)} required />
        </label>
        <br />
        <label>
          Country:
          <select value={addressCountry} onChange={(e) => setAddressCountry(e.target.value)} required>
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            {/* Add more country options */}
          </select>
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>
        Already have a Stripe account?{' '}
        <Link href="https://connect.stripe.com/express/oauth/authorize"
          target="_blank">Connect with Stripe
        </Link>
      </p>
    </div>
  );
}
