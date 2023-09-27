// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: 'https://lingua-books.com', // or AUTH0_AUDIENCE
      // Add the `offline_access` scope to also get a Refresh Token
      scope: 'openid profile sell offline_access' // or AUTH0_SCOPE
    }
  })
});