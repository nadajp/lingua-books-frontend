import axios from 'axios';
import { getAccessToken, getSession } from '@auth0/nextjs-auth0';
import { stripe } from 'src/utils/stripe';
import { ManagementClient } from 'auth0';

export default async function handler(req, res) {
    const sig = req.headers['stripe-signature'];

    try {
        const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        const result = await handleStripeEvent(event, req, res);
        res.status(200).json({ received: true, result });
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }
}

async function handleStripeEvent(event, req, res) {
    switch (event.type) {
        case 'account.updated':
            return await handleAccountUpdated(event, req, res);
        case 'account.application.deauthorized':
        const accountApplicationDeauthorized = event.data.object;
        // Then define and call a function to handle the event account.application.deauthorized
        break;
        case 'account.external_account.created':
        const accountExternalAccountCreated = event.data.object;
        // Then define and call a function to handle the event account.external_account.created
        break;
        case 'account.external_account.deleted':
        const accountExternalAccountDeleted = event.data.object;
        // Then define and call a function to handle the event account.external_account.deleted
        break;
        case 'account.external_account.updated':
        const accountExternalAccountUpdated = event.data.object;
        // Then define and call a function to handle the event account.external_account.updated
        break;
        // ... handle other event types
        default:
        console.log(`Unhandled event type ${event.type}`);
    }
}

async function handleAccountUpdated(event, req, res) {
    const account = event.data.object;
    const stripeStatus = account.charges_enabled ? 'active' : 'inactive';

    try {
        const { accessToken } = await getAccessToken(req, res);
        const { user } = await getSession(req, res);
        
        const encodedAuthUser = encodeURI(user.sub);
        const config = {
            headers: { 'content-type': 'application/json', Authorization: `Bearer ${accessToken}` }
        };

        const sellerData = {
            stripeStatus
        }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sellers?authUser=${encodedAuthUser}`, sellerData, config);
            
        if (response.status === 201) {
            await upgradeRoleToSeller(user);
            return { status: 'Account Updated', stripeStatus };
          } else {
            return { status: 'Account Not Updated', stripeStatus };
          }
        } catch (error) {
            console.error('Error:', error);
            return { error: 'Internal server error.' };
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