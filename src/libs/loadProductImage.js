import { GetObjectCommand } from '@aws-sdk/client-s3';
import s3Client from './s3Client'

export default async function loadProductImage(objectKey) {
    const bucketName = "lingua-books-images"
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