export default async function handler(req, res) {
    console.log('api/oauth2/token.js...');
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { code } = req.body;
    console.log('code inside token.js:' + code)
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const grantType = 'authorization_code';
    const tokenEndpoint = process.env.TOKEN_ENDPOINT;
    const redirectUri = process.env.REDIRECT_URI;

    console.log('redirectUri inside token.js:' + redirectUri);
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const bod = `grant_type=${grantType}&code=${code}&redirect_uri=${redirectUri}`;
    console.log('bod inside token.js:' + bod);
    console.log('calling token endpoint: '  + tokenEndpoint)
    const tokenRes = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${auth}`,
        },
        body: `grant_type=${grantType}&code=${code}&redirect_uri=${redirectUri}`
    });

    const data = await tokenRes.json();
    console.log('data inside token.js:', data);

    if (tokenRes.ok) {
        res.status(200).json(data);
    } else {
        res.status(400).json({ error: data.error });
    }
}
