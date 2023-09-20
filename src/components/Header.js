import Link from "next/link";
import Logo from "./common/logo";
import MainMenu from "./Menus/MainMenu";
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function Header() {
  // const { isLoggedIn, isSeller } = useContext(UserContext);
  const isLoggedIn = false;
  const userId = null;
  const isSeller = false;

  const router = useRouter();

  const handleSellBookClick = () => {
    if (!isLoggedIn) {
      // Redirect to login/registration page with a note about logging in to sell
      // Example: Replace '/login' with the actual login/registration page URL
      router.push('/login');
    } else if (!isSeller) {
      // Redirect to become a seller page
      // Example: Replace '/become-seller' with the actual become a seller page URL
      router.push('/new-seller');
    } else {
      // Redirect to add new product page
      // Example: Replace '/add-new-product' with the actual add new product page URL
      router.push('/add-new-product');
    }
  };
    return (
        <header className="sticky top-0 bg-black z-10 shadow">
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center">
              <Logo />
              <button
              className="text-gray-400 hover:text-gray-100"
              onClick={handleSellBookClick}
            >
              Sell Your Book
            </button>
            </div>
            <div className="mt-1">
              <MainMenu 
                selectedLanguages={[]}
              />
            </div>
          </div>
        </header>
      );
    }
