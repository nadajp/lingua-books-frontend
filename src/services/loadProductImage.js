import s3Client from '../libs/s3Client';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export default async function loadProductImage(objectKey) {
    const params = {
        Bucket: 'lingua-books-images', 
        Key: objectKey, 
        Expires: 60 * 60 // URL expires in 1 hour
      };
    
      const command = new GetObjectCommand(params);      
      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      return url;
}