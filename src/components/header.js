import Link from "next/link";
import Logo from "./logo";
import MainMenu from "./mainMenu"
import { ShoppingCartIcon } from '@heroicons/react/24/solid'

export default function Header() {
     // Sample categories data structure
    const categories = [
        {
        name: 'Fiction',
        subcategories: ['Classic', 'Mystery', 'Sci-Fi', 'Fantasy', 'Romance'],
        },
        {
        name: 'Non-Fiction',
        subcategories: ['Biography', 'History', 'Science', 'Self-Help', 'Travel'],
        },
    ];
    return (
        <header className="sticky top-0 bg-black z-10 shadow">
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center">
              <Logo />
              <Link href="/add-new-product"
                className=" text-gray-400 hover:text-gray-100">
                Sell Your Book
              </Link> 
            </div>
            <div className="mt-1">
              <MainMenu categories={categories} />
            </div>
          </div>
        </header>
      );
    }
