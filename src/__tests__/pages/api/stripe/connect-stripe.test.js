import { waitFor } from '@testing-library/react';
import handler from 'src/pages/api/stripe/connect-stripe';
import axios from 'axios';
import { stripe } from '../../../../utils/stripe';

jest.mock('@auth0/nextjs-auth0', () => ({
    getAccessToken: jest.fn().mockResolvedValue({ accessToken: 'mockAccessToken' }),
    getSession: jest.fn().mockResolvedValue({ user: { sub: 'mockUserId', email: 'mockUserEmail' } })
}));

jest.mock('axios');

jest.mock('../../../../utils/stripe', () => {
    const stripeMocks = {
      accounts: {
        create: jest.fn().mockReturnValue({ id: 'stripe_account_id' }),
      },
      accountLinks: {
        create: jest.fn().mockReturnValue({url: 'account_link_url'})
      },
    };
    return { stripe: stripeMocks };
  });

describe('Connect Stripe handler', () => {   
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should create a Stripe account, save it to the database, and return an account link URL when valid input is provided', async () => {
        axios.post.mockReturnValue({ status: 200 });

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const sellerData = {
            displayName: 'Test User',
            city: 'Test City',
            state: 'Test State',
            country: 'Test Country'
        };
        req.body = sellerData;

        await handler(req, res);

        waitFor(() => {
            expect(stripe.accounts.create).toHaveBeenCalledWith(
            { 
                type: 'express',
                email: 'mockUserEmail',
                business_type: 'individual',
                business_profile: {
                    url: 'https://lingua-books.com',
                    support_address: {
                        city: sellerData.city,
                        state: sellerData.state,
                    },     
                }
            });
            
            const config = {
                headers: { 'content-type': 'application/json', Authorization: `Bearer ${accessToken}` }
            }

            expect(axios.post).toHaveBeenCalledWith(
                `http://localhost:3000/api/${sellers}`,
                sellerData,
                config
            );
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ url: 'account_link_url' });
        });
    });

    it('should return a 400 error response with a list of validation errors when invalid input is provided', async () => {
      const req = {
        body: {
          displayName: 'Invalid User123',
          city: 'Invalid City123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await handler(req, res);

      waitFor(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            errors: [
            'Display name must be between 2 and 50 alphabetic characters.',
            'City name must be between 2 and 100 alphabetic characters.',
            ],
        });
    });
    });

    it('should return a 500 error response with an \'Internal server error\' message when an error occurs during Stripe account creation', async () => {
      const req = {
        body: {
          displayName: 'Test User',
          city: 'Test City',
          state: 'Test State',
          country: 'Test Country',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      stripe.accounts.create.mockRejectedValue(new Error('Stripe account creation error'));

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error.' });
    });

    it('should return a validation error when the display name is too short', async () => {
      const req = {
        body: {
          displayName: 'A',
          city: 'Test City',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: ['Display name must be between 2 and 50 alphabetic characters.'],
      });
    });

    it('should return a validation error when the display name is too long', async () => {
      const req = {
        body: {
          displayName: 'Test User Test User Test User Test User Test User Test User Test User Test User Test User Test User',
          city: 'Test City',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: ['Display name must be between 2 and 50 alphabetic characters.'],
      });
    });

    it('should return a validation error when the display name contains non-alphabetic characters', async () => {
      const req = {
        body: {
          displayName: 'Test User123',
          city: 'Test City',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: ['Display name must be between 2 and 50 alphabetic characters.'],
      });
    });

  it('should return a 500 error response with an \'Failed to create Stripe account link.\' message when an error occurs during Stripe account link retrieval', async () => {
      const req = {
        body: {
          displayName: 'Test User',
          city: 'Test City',
          state: 'Test State',
          country: 'Test Country',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      stripe.accounts.create.mockReturnValue({ id: 'stripe_account_id' });
      stripe.accountLinks.create.mockReturnValue({url: null})
      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create Stripe account link.' });
    });
});
