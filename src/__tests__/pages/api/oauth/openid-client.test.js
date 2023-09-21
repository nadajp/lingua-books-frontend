/**
 * @jest-environment node
 */
import '@testing-library/jest-dom'
import getAuthorizationUrl from '../../../../pages/api/oauth/openid-client';

jest.mock('../../../../utils/init-openid-client', () => {
  return jest.fn();
});

import initializeClient from '../../../../utils/init-openid-client';

describe('getAuthorizationUrl', () => {

    test('should return a valid authorization URL', async () => {
      const expectedUrl = 'https://example.com/auth?scope=openid%20user.read%20user.write';

      const client = {
        authorizationUrl: jest.fn().mockReturnValue(expectedUrl),
      };
      initializeClient.mockResolvedValue(client);

      const result = await getAuthorizationUrl();
      
      expect(initializeClient).toHaveBeenCalled();
      expect(client.authorizationUrl).toHaveBeenCalledWith({
        scope: 'openid user.read user.write',
        
      });
      expect(result).toBe(expectedUrl);
    });
});


