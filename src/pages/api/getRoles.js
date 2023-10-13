import { ManagementClient } from 'auth0';
export default async function handler(req, res) {
    var management = new ManagementClient({
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
      });
    
      const params =  { id : req.body.user } ;
    
      management.users.getRoles(params).then((roles) => {
        res.status(200).json(roles);
      }).catch((error) => {
        console.log('error: ', error);
        res.status(500).json(error);
      });
}