import 'src/styles/globals.css'
import AppLayout from '../components/Layout/Layout'
import { CategoriesProvider } from '../contexts/CategoryContext'
import { LanguageProvider } from '../contexts/LanguageContext'
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
    <CategoriesProvider>
    <LanguageProvider>
    {/* <UserProvider> */}
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
      {/* </UserProvider> */}
      </LanguageProvider>
    </CategoriesProvider>
    </UserProvider>
  );
}

