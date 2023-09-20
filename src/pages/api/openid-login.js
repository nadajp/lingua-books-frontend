import getAuthorizationUrl from './oauth/openid-client'
import { generators } from 'openid-client';

export default async function openidLogin(req, res) {
  // const code_verifier = generators.codeVerifier();

  // console.log('code_verifier generated in openid-login: ' + code_verifier);
  // //Save the code verifier in an HTTP-only cookie
  // res.setHeader('Set-Cookie', [
  //   `code_verifier=${code_verifier}; Max-Age=${60 * 60};`,
  //   `Path=/;`,
  //   `HttpOnly;`,
  //   `SameSite=Strict;`,
  //   `Secure;`
  // ]);

  const authorizationUrl = await getAuthorizationUrl();
  
  console.log('Authorization URL: ' , authorizationUrl);
  res.json({ authorizationUrl });
}
