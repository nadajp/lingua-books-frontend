import handler, { upgradeRoleToSeller } from 'src/pages/api/sellers';
import axios from 'axios';

jest.mock('@auth0/nextjs-auth0', () => ({
    getAccessToken: jest.fn().mockResolvedValue({ accessToken: 'mockAccessToken' }),
    getSession: jest.fn().mockResolvedValue({ user: { sub: 'mockUserId', email: 'mockUserEmail' } })
}));

const { getAccessToken, getSession } = require('@auth0/nextjs-auth0');

jest.mock('axios', () => ({
    get: jest.fn().mockResolvedValue({ data: [{ stripeAccountId: 'mockStripeAccountId' }] }),
    post: jest.fn().mockResolvedValue({ status: 201 })
}));

const mockGet = axios.get;
const mockPost = axios.post;

jest.mock('../../../utils/stripe', () => ({
    stripe: {
        accounts: {
            retrieve: jest.fn().mockResolvedValue({ charges_enabled: true })
        }
    }
}));

const { retrieve } = require('../../../utils/stripe').stripe.accounts; // get reference to the mocked function

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

    it('should return a 201 status code and a success message when the seller registration is successful and the user is upgraded to a seller role', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await handler(req, res);

        expect(getAccessToken).toHaveBeenCalledWith(req, res);
        expect(getSession).toHaveBeenCalledWith(req, res);
        expect(mockGet).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/sellers?authUser=mockUserId`, {
            headers: { 'content-type': 'application/json', Authorization: 'Bearer mockAccessToken' },
        });
        expect(retrieve).toHaveBeenCalledWith('mockStripeAccountId');
        expect(mockPost).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/sellers`, { stripeStatus: 'active' }, {
            headers: { 'content-type': 'application/json', Authorization: 'Bearer mockAccessToken' },
        });

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Seller registration successful.' });
    });
});
