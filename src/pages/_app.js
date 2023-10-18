import 'src/styles/globals.css'
import AppLayout from '../components/Layout/Layout'
import { CategoriesProvider } from '../contexts/CategoryContext'
import { LanguageProvider } from '../contexts/LanguageContext'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import WithRoles from 'src/components/Layout/WithRoles';
export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
    <CategoriesProvider>
      <UserProvider>
        <WithRoles>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </WithRoles>
      </UserProvider>
    </CategoriesProvider>
  </LanguageProvider>
  );
}

