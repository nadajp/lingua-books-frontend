import nextConnect from 'next-connect';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import Product from './model/product';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '../../libs/s3Client';

export const config = {
  api: {
    bodyParser: false
  }
}

const API_URL = 'http://localhost:8080/api/v1/products';
const upload = multer({ dest: '/tmp' });
const handler = nextConnect();
handler.use(upload.single('image'));

// POST /api/products
handler.post(async (req, res) => {
  console.log('Received fields:', req.body);
  console.log('Received file:', req.file);

  const product = new Product();
  product.setName(req.body.name);
  product.setPrice(req.body.price);
  product.setDescription(req.body.description);
  product.setLanguage(req.body.language);
  product.setAuthor(req.body.author);
  product.setCondition(req.body.condition);
  product.setCategoryId(req.body.categoryId);
  product.setSubcategoryId(req.body.subcategoryId);
  product.setPublisher(req.body.publisher);
  product.setPublicationYear(req.body.publicationYear);
  product.setIsbn(req.body.isbn);
  product.setLength(req.body.length);
  product.setFormat(req.body.format);
  product.setDimensionLength(req.body.dimensionLength);
  product.setDimensionWidth(req.body.dimensionWidth);
  product.setSellerId(1);

  const imagePath = req.file.path;
  const formData = new FormData();
  
  formData.append('image', fs.createReadStream(imagePath, { contentType: 'image/jpeg' }));
  formData.append('product', JSON.stringify(product), { contentType: 'application/json' });

  try {
    const headers = {
      'Content-Type': 'multipart/form-data'
    }

    const response = await axios.post(API_URL, formData, { headers });
    
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


// GET /api/products
handler.get(async (req, res) => {
  try {
    // Retrieve the products from the external API
    const response = await axios.get(API_URL);
    const products = response.data;

    // Loop through the products and retrieve the images from S3
    for (const product of products) {
      if (product.imageUrl) {
        console.log('key: ' + product.imageUrl)

        const image = await getObjectFromS3("lingua-books-images", product.imageUrl);
        
        product.image = image
      }
    }
    res.json(products);
  } catch (error) {
    console.error("External API error when retrieving product images from server:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

async function getObjectFromS3(bucketName, objectKey) {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
    });

    const s3Response = await s3Client.send(command);

    const response = new Response(s3Response.Body);
    const buffer = await response.buffer();
    const imageBase64 = buffer.toString('base64');

    return imageBase64
  } catch (error) {
    console.error("Error getting object from S3:", error);
    throw error;
  }
}
export default handler;