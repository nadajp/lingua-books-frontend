import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Callback() {
    const router = useRouter();
    const { code } = router.query;

    useEffect(() => {
        console.log('code: ' + code);

        if (code) {
            exchangeAuthCodeForToken(code);
        }
    }, [code]);

    async function exchangeAuthCodeForToken(authCode) {
        const res = await fetch('../api/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: authCode })
        });

        const data = await res.json();

        if (res.ok) {
            console.log('Access Token:', data.access_token);
        } else {
            console.error('Error:', data.error);
        }
    }

    return <div>Processing...</div>;
}
