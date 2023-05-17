import 'src/styles/globals.css'
import AppLayout from '../components/Layout'
import { CategoriesProvider } from 'src/contexts/CategoryContext';

export default function App({ Component, pageProps }) {
  return (
    <CategoriesProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </CategoriesProvider>
  );
}

