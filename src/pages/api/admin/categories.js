import axios from 'axios';
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default withApiAuthRequired(async function handler(req, res) {
  if (req.method === 'POST') {

    const newCategory = req.body;

    const generateSlug = (name) => {
      return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-"); // Convert spaces to dashes
    };

    newCategory.slug = generateSlug(newCategory.name);
        
    const isSubcategory = !!newCategory.parentCategoryId;
    const endpointUrl = isSubcategory
      ? `${apiUrl}/subcategories`
      : `${apiUrl}/categories`;

      console.log('endpointUrl:', endpointUrl)
      console.log('newCategory', newCategory)

    try {
      const { accessToken } = await getAccessToken(req, res);
    
      const config = {
          headers: { 'content-type': 'application/json', Authorization: `Bearer ${accessToken}` }
      }        
      const response = await axios.post(endpointUrl, newCategory, config);

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    console.log('HERE*************')
  }
}
)
  
