import axios from 'axios';
import { getAccessToken, getSession } from '@auth0/nextjs-auth0';
import { ManagementClient } from 'auth0';
import { stripe } from 'src/utils/stripe';

export default async function handler(req, res) {
    try {
        const { accessToken } = await getAccessToken(req, res);
        const { user } = await getSession(req, res);
        
        const encodedAuthUser = encodeURI(user.sub);
        const config = {
            headers: { 'content-type': 'application/json', Authorization: `Bearer ${accessToken}` }
        };

        const sellerResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sellers?authUser=${encodedAuthUser}`, config);
        const stripeAccountId = sellerResponse.data[0].stripeAccountId;
        const account = await stripe.accounts.retrieve(stripeAccountId);

        console.log('account', account);
        let sellerData = {};

        sellerData.stripeStatus = account.charges_enabled ? 'ACTIVE' : 'PENDING';

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sellers`, sellerData, config);
        
        if (response.status === 201) {
            if (sellerData.stripeStatus === 'ACTIVE') {
                await upgradeRoleToSeller(user);
            }
            return res.status(200).json({ message: 'Seller registration successful. Stripe status: ' + sellerData.stripeStatus });
        } else if (response.status === 401) {
            return res.status(401).json({ error: 'You must be logged in to become a seller.' });
        } else {
            return res.status(response.status).json({ error: 'Seller registration failed.' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

async function upgradeRoleToSeller(user) {
    const management = new ManagementClient({
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
    });

    const params = { id: user.sub };
    const data = { roles: [process.env.ROLE_SELLER] };

    try {
        await management.users.assignRoles(params, data);
        console.log('User role assigned successfully to user ', user.email);
    } catch (err) {
        console.log('Error, user role was not assigned:', err);
    }
}
