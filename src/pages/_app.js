import 'src/styles/globals.css'
import AppLayout from '../components/Layout/Layout'
import { CategoriesProvider } from 'src/contexts/CategoryContext';
import { LanguageProvider } from 'src/contexts/LanguageContext';
import { UserProvider } from 'src/contexts/UserContext';


export default function App({ Component, pageProps }) {
  return (
    <CategoriesProvider>
    <LanguageProvider>
    {/* <UserProvider> */}
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
      {/* </UserProvider> */}
      </LanguageProvider>
    </CategoriesProvider>
  );
}

