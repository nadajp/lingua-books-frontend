import React from 'react';

export default function LoginPage() {

   function openIdLogin() {
    fetch('/api/auth/login').then(res => res.json()).then(data => {
      window.location.href = data.authorizationUrl;
    });
  }

  return (
    <div>
      <a href="/api/auth/login">Login</a>
    </div>
  );
}

