import handler from '../../../../pages/api/stripe/complete-registration';
import axios from 'axios';

jest.mock('@auth0/nextjs-auth0', () => ({
    getAccessToken: jest.fn().mockResolvedValue({ accessToken: 'mockAccessToken' }),
    getSession: jest.fn().mockResolvedValue({ user: { sub: 'mockUserId', email: 'mockUserEmail' } })
}));


const { getAccessToken, getSession } = require('@auth0/nextjs-auth0');

jest.mock('axios', () => ({
    get: jest.fn().mockResolvedValue({ data: { stripeAccountId: 'mockStripeAccountId' } }),
    put: jest.fn().mockResolvedValue({ status: 200 })
}));

const mockGet = axios.get;
const mockPut = axios.put;

jest.mock('auth0', () => ({
    ManagementClient: jest.fn().mockImplementation(() => {
        return {
          users: {
            assignRoles: jest.fn().mockResolvedValue({status: 200}),
          },
        };
      }),
}));

const ManagementClient = require('auth0').ManagementClient;

jest.mock('../../../../utils/stripe', () => ({
    stripe: {
        accounts: {
            retrieve: jest.fn().mockResolvedValue({ charges_enabled: true })
        }
    }
}));

const { retrieve } = require('../../../../utils/stripe').stripe.accounts; // get reference to the mocked function

const mockAssignRoles = jest.fn().mockResolvedValue(true);
jest.mock('auth0', () => ({
    ManagementClient: jest.fn().mockImplementation(() => ({
        users: {
            assignRoles: mockAssignRoles
        }
    }))
}));


describe('handler', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a 200 status code and a success message when the seller registration is successful and the user is upgraded to a seller role', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await handler(req, res);

        expect(getAccessToken).toHaveBeenCalledWith(req, res);
        expect(getSession).toHaveBeenCalledWith(req, res);
        expect(mockGet).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/sellers/mockUserId`, {
            headers: { 'content-type': 'application/json', Authorization: 'Bearer mockAccessToken' },
        });
        expect(retrieve).toHaveBeenCalledWith('mockStripeAccountId');
        expect(mockPut).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/sellers/mockUserId`, { stripeStatus: 'ACTIVE' }, {
            headers: { 'content-type': 'application/json', Authorization: 'Bearer mockAccessToken' },
        });

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Seller registration successful. Stripe status: ACTIVE', shouldRedirect: true });
    });

    it ('should call managementApi to upgrade role to Seller', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const params = { id: 'mockUserId' };
        const data = { roles: [process.env.ROLE_SELLER] };
    
        const management = new ManagementClient({
          domain: 'mock-domain',
          clientId: 'mock-client-id',
          clientSecret: 'mock-client-secret',
        });

        await handler(req, res);

        expect(management.users.assignRoles).toHaveBeenCalledWith(params, data);
    });
});
