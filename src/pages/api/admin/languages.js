import axios from 'axios';
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default withApiAuthRequired(async function handler(req, res) {
  if (req.method === 'POST') {

    const newLanguage = req.body;

    try {
      const { accessToken } = await getAccessToken(req, res);
      const config = {
          headers: { 'content-type': 'application/json', Authorization: `Bearer ${accessToken}` }
      }        
      const response = await axios.post(`${apiUrl}/languages`, newLanguage, config);

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'method not allowed' });
  }
})
  
