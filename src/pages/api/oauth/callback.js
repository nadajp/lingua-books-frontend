import initializeClient from '../../../utils/init-openid-client'
import cookieParser from 'cookie-parser';

export default async function handler(req, res) {
    const client = await initializeClient();
    const params = client.callbackParams(req);
    console.log('params: ', params);

    cookieParser()(req, res, () => {});
  
    // Now req.cookies is populated
    console.log('cookies: ', req.cookies);
    const { code_verifier } = req.cookies;  // assuming you have a cookie parser middleware
    console.log('code_verifier: ', code_verifier);

    client
      .callback(process.env.REDIRECT_URI, params, { code_verifier })
      .then(tokenSet => {
        console.log("received and validated tokens %j", tokenSet);
        console.log("validated id_token claims %j", tokenSet.claims);
        return res.redirect('/add-new-product');
      })
      .catch(e => console.log("eta", e));
  }
  
  
  