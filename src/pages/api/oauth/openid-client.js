import initializeClient from '../../../utils/init-openid-client'
import { generators } from 'openid-client';

export async function getAuthorizationUrl() {
    const client = await initializeClient();

    //const code_challenge = generators.codeChallenge(code_verifier);
    //console.log('code_challenge: ' + code_challenge);
    
    return client.authorizationUrl({
      scope: 'openid user.read user.write'
      //code_challenge,
      //code_challenge_method: 'S256',
    });
}

