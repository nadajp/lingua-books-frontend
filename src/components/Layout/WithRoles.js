import { useUser } from '@auth0/nextjs-auth0/client';
import RolesProvider from 'src/contexts/RolesContext';

export default function WithRoles(props) {
    const { user } = useUser();
    return (
      <RolesProvider user={user}>
        {props.children}
      </RolesProvider>
    );
  }