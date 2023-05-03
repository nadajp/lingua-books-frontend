import nextConnect from 'next-connect';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false
  }
}

const upload = multer({ dest: '/tmp' });
const handler = nextConnect();
handler.use(upload.single('image'));

handler.post(async (req, res) => {
  console.log('Received fields:', req.body);
  console.log('Received file:', req.file);

  const product = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    language: req.body.language,
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
    sellerId: 1
  }

  const imagePath = req.file.path;
  const formData = new FormData();
  
  formData.append('image', fs.createReadStream(imagePath, { contentType: 'image/jpeg' }));
  formData.append('product', JSON.stringify(product), { contentType: 'application/json' });

  try {
    const apiUrl = 'http://localhost:8080/api/v1/products';
    const headers = {
      'Content-Type': 'multipart/form-data'
    }

    const response = await axios.post(apiUrl, formData, { headers });
    
    console.log('External API response:', response.data);
    res.status(200).json({ message: 'Form data processed successfully.' });
  } catch (error) {
    console.error('External API error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  } finally {
    // Delete the temporary file from the file system
    fs.unlinkSync(imagePath);
  }
});

export default handler;