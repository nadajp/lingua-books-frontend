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

    test('should return a valid authorization URL with code_challenge and code_challenge_method', async () => {
      const code_verifier = 'test_code_verifier';
      const expectedUrl = 'https://example.com/auth?scope=openid%20user.read%20user.write&code_challenge=test_code_challenge&code_challenge_method=S256';

      const client = {
        authorizationUrl: jest.fn().mockReturnValue(expectedUrl),
      };
      initializeClient.mockResolvedValue(client);

      const result = await getAuthorizationUrl(code_verifier);
      
      expect(initializeClient).toHaveBeenCalled();
      expect(client.authorizationUrl).toHaveBeenCalledWith({
        scope: 'openid user.read user.write',
        code_challenge: expect.any(String),
        code_challenge_method: 'S256',
      });
      expect(result).toBe(expectedUrl);
    });
});


