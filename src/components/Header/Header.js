import Link from "next/link";
import Logo from "../common/logo";
import MainMenu from "../MainMenu/MainMenu";

export default function Header() {
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
              <MainMenu 
                selectedLanguages={[]}
              />
            </div>
          </div>
        </header>
      );
    }
