import React from 'react';

function LoginPage() {
  const redirectToOAuthServer = () => {
    // Construct the URL for OAuth2 Authorization Endpoint
    const clientId = 'lingua-client';
    const redirectUri = encodeURIComponent('http://127.0.0.1:3000/oauth/lingua-client');
    const response_type = 'code';
    const scope = encodeURIComponent('user.read user.write');
    const authServerUrl = "http://127.0.0.1:8080/oauth2";

    const authUrl = `${authServerUrl}/authorize?response_type=${response_type}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    console.log(authUrl);
    // Redirect the user to the OAuth2 Authorization Server for login
    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={redirectToOAuthServer}>Login with OAuth2</button>
    </div>
  );
}

export default LoginPage;


