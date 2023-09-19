import { Issuer } from 'openid-client';

let client = null;  

export default async function initializeClient() {
  if (!client) {
    const issuer = await Issuer.discover(process.env.AUTH_SERVER);
    console.log("Discovered issuer %s %O", issuer.issuer, issuer.metadata);
    
    client = new issuer.Client({
        client_id: 'lingua-client',
        client_secret: process.env.CLIENT_SECRET,
        grant_types: ["authorization_code"],
        redirect_uris: [process.env.REDIRECT_URI],
        response_types: ['code'],
    });
  }
  return client;
}