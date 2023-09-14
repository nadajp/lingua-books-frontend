
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/register`

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const register = req.body;
    
        try {
          const response = await axios.post(API_URL, register);
    
          res.status(200).json(response.data);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      } else {
        console.log('HERE*************')
      }
};