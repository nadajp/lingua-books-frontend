import Logo from "./common/logo";
import MainMenu from "./Menus/MainMenu";
import { useRouter } from 'next/navigation';
import Profile from "./Profile";
export default function Header() {

  const isSeller = false;

  const router = useRouter();

    return (
        <header className="sticky top-0 bg-black z-10 shadow">
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center">
              <Logo />
              <Profile />
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
