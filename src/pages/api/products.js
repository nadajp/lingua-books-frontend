import { createRouter } from 'next-connect';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export const config = {
  api: {
    bodyParser: false
  }
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`
const upload = multer({ dest: '/tmp' });
const router = createRouter();
router.use(upload.single('image'));

withApiAuthRequired(router.post(async (req, res) => {
  const languageId = Number(req.body.languageId);
  
  const product = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    languageId,
    author: req.body.author,
    condition: req.body.condition,
    categoryId: req.body.categoryId,
    subcategoryId: req.body.subcategoryId,
    publisher: req.body.publisher,
    publicationYear: req.body.publicationYear,
    isbn: req.body.isbn,
    length: req.body.length,
    format: req.body.format,
    dimensionLength: req.body.dimensionLength,
    dimensionWidth: req.body.dimensionWidth,
    sellerId: req.body.sellerId
  };

  const imagePath = req.file?.path;
  const formData = new FormData();
  
  if (imagePath) {
    formData.append('image', fs.createReadStream(imagePath, { contentType: 'image/jpeg' }));
  }
  formData.append('product', JSON.stringify(product), { contentType: 'application/json' });

  try {
    const { accessToken } = await getAccessToken(req, res);
    console.log('accessToken: ', accessToken);

    const headers = {
      'Content-Type': 'multipart/form-data', Authorization: `Bearer ${accessToken}` 
    }

    const response = await axios.post(API_URL, formData, { headers });
    
    console.log('External API response:', response.data);
    res.status(200).json({ message: 'Form data processed successfully.' });
  } catch (error) {
      console.error('External API error:', error);
      res.status(500).json({ error: 'Internal server error.' });
  } finally {
      if (imagePath)
        fs.unlinkSync(imagePath);
  }
}));

export default router.handler();