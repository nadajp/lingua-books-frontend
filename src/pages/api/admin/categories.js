import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req, res) {
  console.log('Request method:', req.method);
  console.log('Request URL:', req.url);
  if (req.method === 'POST') {

    const newCategory = req.body;
        
    const isSubcategory = !!newCategory.parentId;
    const endpointUrl = isSubcategory
      ? `${apiUrl}/subcategories`
      : `${apiUrl}/categories`;

      console.log('endpointUrl', endpointUrl)
      console.log('newCategory', newCategory)

    try {
      const response = await axios.post(endpointUrl, newCategory);

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    console.log('HERE*************')
  }
}
  
