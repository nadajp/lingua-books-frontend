import s3Client from '../libs/s3Client';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export default async function loadProductImage(objectKey) {
    const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME, 
        Key: objectKey, 
        Expires: 60 * 60 * 24 * 7 // URL expires in 1 hour
      };
    
      const command = new GetObjectCommand(params);      
      const url = await getSignedUrl(s3Client, command, { expiresIn: params.Expires });
      console.log('URL: ' , url);
      return url;
}