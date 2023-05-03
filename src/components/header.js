import Link from "next/link";
import Logo from "./logo";
import { ShoppingCartIcon } from '@heroicons/react/24/solid'

export default function Header() {
    return (
        <header className="sticky top-0 bg-black z-10 shadow">
            <div className="container mx-auto p-6 flex justify-between">
            <Logo />
            <Link href="/add-new-product"
                className="flex items-center space-x-1 text-gray-400 hover:text-gray-100">
                Sell Your Book
            </Link> 
            {/* <Link href="/cart"
                className="flex items-center space-x-1 text-gray-400 hover:text-gray-100">
                <div className="relative">
                    <ShoppingCartIcon className="w-7 h-7 flex-shrink-0"/>
                </div>
                <p className="text-lg">
                    $0.00{" "}
                    <span className="text-sm text-gray-400">(0)</span>
                </p>
            </Link> */}
            </div>
        </header>
    );
}