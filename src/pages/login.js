import React from 'react';

function LoginPage() {

   function openIdLogin() {
    fetch('/api/openid-login').then(res => res.json()).then(data => {
      window.location.href = data.authorizationUrl;
    });
  }

  return (
    <div>
      <button onClick={openIdLogin}>Log in to start selling</button>
    </div>
  );
}

export default LoginPage;


