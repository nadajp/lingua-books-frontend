import axios from 'axios';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { getSession } from '@auth0/nextjs-auth0';
import { ManagementClient } from 'auth0';

export default async function handler (req, res) {
    try {
      const { accessToken } = await getAccessToken(req, res);
      //console.log('accessToken: ', accessToken);
      const { user } = await getSession(req, res);
      //console.log('user: ', user);

      const {
        firstName,
        lastName,
        addressStreet,
        addressNumber,
        addressCity,
        addressState,
        addressZip,
        addressCountry,
        phoneNumber,
      } = req.body;

      // validation logic here

      const sellerData = {
        firstName,
        lastName,
        addressStreet,
        addressNumber,
        addressCity,
        addressState,
        addressZip,
        addressCountry,
        phoneNumber,
        authUser: user.sub
      };

      const config = {
        headers: { 'content-type': 'application/json', Authorization: `Bearer ${accessToken}` }
     };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sellers`,
        sellerData,
        config
      );

      if (response.status === 201) {
          upgradeRoleToSeller(user);
          return res.status(201).json({ message: 'Seller registration successful.' });
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
 
function upgradeRoleToSeller(user) {

  var management = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
  });

  const params =  { id : user.sub} ;
  const data = { "roles" : [process.env.ROLE_SELLER]};

  console.log('data: ', data);

  management.users.assignRoles(params, data, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      console.log('user role assigned');
    }
  });
}