import { stripe } from 'src/utils/stripe';
import axios from 'axios';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req, res) {

    const { user } = await getSession(req, res);
    const {
        displayName,
        city,
        state,
        country
      } = req.body;

      // validation logic here

      const sellerData = {
        displayName,
        city,
        state,
        country,
        authUser: user.sub,
        stripeStatus: 'INITIALIZING'
      };

    try {
        const account = await createStripeAccount(user, sellerData);

        sellerData.stripeAccountId = account.id;

        await saveSeller(req, res, user, sellerData);

        const accountLinkUrl = await createStripeAccountLink(account.id);

        if (accountLinkUrl) {
            res.status(200).json({ url: accountLinkUrl });
        } else {
            res.status(500).json({ error: 'Failed to create Stripe account link.' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

async function createStripeAccount(user, sellerData) {
    return await stripe.accounts.create({
        type: 'express',
        email: user.email,
        business_type: 'individual',
        business_profile: {
            url: process.env.LINGUA_BASE_URL,
            support_address: {
                city: sellerData.city,
                state: sellerData.state,
            },     
        },
    });
}

async function createStripeAccountLink(accountId) {
    const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: process.env.BASE_URL,  
        return_url: process.env.STRIPE_RETURN_URL, 
        type: 'account_onboarding',
    });
    return accountLink.url;
}

async function saveSeller(req, res, user, sellerData) {
    const { accessToken } = await getAccessToken(req, res);

    const config = {
        headers: { 'content-type': 'application/json', Authorization: `Bearer ${accessToken}` }
    }

    return await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sellers`,
        sellerData,
        config
    );
}