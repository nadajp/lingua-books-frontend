import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req, res) {
  console.log('Request method:', req.method);
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
  
