import handle from '../../../pages/api/products';
import { createMocks } from 'node-mocks-http';
import axios from 'axios';
import fs from 'fs';
import { waitFor } from '@testing-library/react';

jest.mock('axios');

jest.mock('fs', () => ({
    createReadStream: jest.fn().mockReturnValue('mock-file-path'),
    unlinkSync: jest.fn().mockReturnValue(true)
}));

jest.mock('@auth0/nextjs-auth0', () => ({
    getAccessToken: jest.fn().mockResolvedValue({ accessToken: 'mockAccessToken' }),
    getSession: jest.fn().mockResolvedValue({ user: { sub: 'mockUserId', email: 'mockUserEmail' } }),
    withApiAuthRequired: jest.fn().mockImplementation((handler) => (req, res) => {
        return handler(req, res);
      }),
}));

jest.mock('multer', () => {
    const multerMock = {
      single: jest.fn().mockImplementation(() => (req, res, next) => {
        req.file = { path: 'mock-file-path' };
        next(); // Call next to simulate the middleware's completion
      })
    };
    return jest.fn(() => multerMock);
  });
  
describe('products handler', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should process the form data successfully', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: mockProduct,
            file: { path: 'mock-file-path' },
          });

        axios.post.mockReturnValue({ status: 200 });
        
        await handle(req, res);
    
        waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(req, res);
            expect(res._getStatusCode()).toBe(200);
            expect(JSON.parse(res._getData())).toEqual({ message: 'Form data processed successfully.' });
        });
  });

  it('should handle external API errors', async () => {
    axios.post.mockRejectedValue(new Error('External API error'));
    const unlinkMock = fs.unlinkSync;

    const { req, res } = createMocks({
      method: 'POST',
      body: mockProduct
    });

    await handle(req, res);

    waitFor(() => {
        expect(res._getStatusCode()).toBe(500);
        expect(JSON.parse(res._getData())).toEqual({ error: 'Internal server error.' });
        expect(unlinkMock).toHaveBeenCalledWith('mock-file-path');
    });
  });
});

const mockProduct = {
    name: "Strah u ulici lipa",
    price: 14.99,
    description: 'Croatian children\s classic',
    languageId: 1,
    author: 'Ivana Brlic Mazuranic',
    condition: 'Very good',
    categoryId: 3,
    subcategoryId: 1,
    publisher: 'Mozaik',
    publicationYear: 1999,
    length: 100,
    format: 'Hardcover',
    sellerId: 'auth|12345'
};