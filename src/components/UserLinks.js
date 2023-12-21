import { useUser } from '@auth0/nextjs-auth0/client';
import { useRoles } from '../contexts/RolesContext';
import Link from 'next/link';

export default function UserLinks() {
    const { user, error, isLoading } = useUser();
    const { isSeller, isAdmin, isLoadingRoles } = useRoles();

    if (isLoading || isLoadingRoles) return <div className="text-white">Loading...</div>;
    if (error) return <div className="text-red">{error.message}</div>;
  
    if (!user) return (
        <a href="/api/auth/login" className="text-white hover:text-yellow-200">
            Login/Register
        </a>
        );
    if (user) {
        return (
        <div className="text-white">
            <div className='hover:text-yellow-200'>
                <Link href="/account">My Account</Link>
            </div>
            <div>
                <a href="/api/auth/logout" className=" hover:text-yellow-200 end-0">
                    Logout
                </a>
            </div>
            {!isSeller && <div>
                <a href="/new-seller" className="text-white end-0">
                    Become a Seller
                </a>
            </div>}
            {isSeller && <div>
                <a href="/add-new-product" className="text-white hover:text-yellow-200 end-0">
                    Sell a book
                </a>
            </div>}
            {isSeller && <div>
                <a href="/admin" className="text-white hover:text-yellow-200 end-0">
                    Admin Panel
                </a>
            </div>}
        </div>
    );
    }
}

