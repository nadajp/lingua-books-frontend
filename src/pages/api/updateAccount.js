import { getSession, getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
    
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }
    
    const session = getSession(req, res);
    if (!session || !session.user) {
        return res.status(401).end();
    }

    const userData = req.body; 
    // Add validation and sanitization as needed

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.sub}`;
    try {
        const { accessToken } = await getAccessToken(req, res);
    
        const config = {
            headers: { 'content-type': 'application/json', Authorization: `Bearer ${accessToken}` }
        }
    
        const response = await axios.post(API_URL, userData, config);
        
        console.log('External API response:', response.data);
        res.status(200).json({ message: 'Account updated successfully.' });
      } catch (error) {
          console.error('External API error:', error);
          res.status(500).json({ error: 'Internal server error.' });
      }

    res.status(200).json({ message: 'Account updated successfully' });
});
