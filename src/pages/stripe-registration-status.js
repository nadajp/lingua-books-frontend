import { useEffect, useState } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

export default function RegistrationSuccess() {
  const { isLoading } = useUser();
  const [statusMessage, setStatusMessage] = useState('Checking your account status...');

  useEffect(() => {
    if (!isLoading) {
      fetch('/api/stripe/complete-registration')
          .then(response => response.json())
          .then(data => {
              setStatusMessage(data.message);
              const router = useRouter();
              router.push('/add-new-product');
          })
          .catch(error => {
              setStatusMessage('There was an error checking your account status.');
          });
    }
  }, [isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Registration Successful!</h1>
      <p>Your seller account has been set up and your Stripe account is being processed.</p>
      <p>You will receive an email from Stripe when your account is ready.</p>
      <p>Account status: {statusMessage}</p>
    </div>
  );
};
