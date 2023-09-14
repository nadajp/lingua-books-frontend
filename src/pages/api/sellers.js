import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Extract data from the request body
      const {
        firstName,
        lastName,
        addressStreet,
        addressNumber,
        addressCity,
        addressState,
        addressZip,
        addressCountry,
        phoneNumber,
      } = req.body;

      // Validate the data (you can add your validation logic here)

      // Create a seller object to send to the Java backend
      const sellerData = {
        firstName,
        lastName,
        addressStreet,
        addressNumber,
        addressCity,
        addressState,
        addressZip,
        addressCountry,
        phoneNumber,
      };

      // Make a POST request to your Java backend API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sellers`,
        sellerData
      );

      // Check if the response from the Java backend is successful
      if (response.status === 201) {
        // Successful response
        return res.status(201).json({ message: 'Seller registration successful.' });
      } else {
        // Handle other response statuses as needed
        return res.status(response.status).json({ error: 'Seller registration failed.' });
      }
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    // Handle other HTTP methods if needed
    return res.status(405).end();
  }
}
