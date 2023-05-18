import 'src/styles/globals.css'
import AppLayout from '../components/Layout/Layout'
import { CategoriesProvider } from 'src/contexts/CategoryContext/CategoryContext';
import { LanguageProvider } from 'src/contexts/LanguageContext/LanguageContext';

export default function App({ Component, pageProps }) {
  return (
    <CategoriesProvider>
    <LanguageProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
      </LanguageProvider>
    </CategoriesProvider>
  );
}

