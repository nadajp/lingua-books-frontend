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

    const errors = validateInput(displayName, city);
    if (errors.length > 0) {
        res.status(400).json({ errors });
    } 

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

        await saveSeller(req, res, sellerData);

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

function validateInput(displayName, city) {
    let errors = [];
  
    const alphaRegex = /^[A-Za-z ]+$/;
  
    if (!displayName || displayName.length < 2 || displayName.length > 50 || !alphaRegex.test(displayName)) {
      errors.push("Display name must be between 2 and 50 alphabetic characters.");
    }
  
    if (!city || city.length < 2 || city.length > 100 || !alphaRegex.test(city)) {
      errors.push("City name must be between 2 and 100 alphabetic characters.");
    }
    return errors;
  }
  
async function createStripeAccount(user, sellerData) {
    return await stripe.accounts.create({
        type: 'express',
        email: user.email,
        business_type: 'individual',
        business_profile: {
            url: process.env.LINGUA_BOOKS_HOME,
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
        refresh_url: process.env.LINGUA_BOOKS_HOME,  
        return_url: `${process.env.LINGUA_BOOKS_HOME}/stripe-registration-status`, 
        type: 'account_onboarding',
    });
    return accountLink.url;
}

async function saveSeller(req, res, sellerData) {
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
