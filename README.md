This is a [Next.js](https://nextjs.org/) project.
It is the frontend portion of my peer to peer books marketplace. It communicates with my secure rest API, using Oauth2 authentication by leveraging openid-client, which is a Certified OpenID library. Product images are stored in an AWS S3 bucket.


## Getting Started

To store product images in aws s3 bucket, create the bucket and a user with read/write access to it, then add s3Client.js to the libs folder with the following content:

import { S3Client } from "@aws-sdk/client-s3";

const REGION = "us-east-1"; 
const ACCESS_KEY_ID = 'xxxxxxxxxxxxxxxxxxx'
const SECRET_ACCESS_KEY =  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

export default s3Client;

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



