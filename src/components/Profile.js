import { useUser } from '@auth0/nextjs-auth0/client';

export default function Profile() {
    const { user, error, isLoading } = useUser();
    console.log('User: ', user);
    if (isLoading) return <div className="text-white">Loading...</div>;
    if (error) return <div  className="text-red">{error.message}</div>;
    if (!user) return (
        <a href="/api/auth/login" className="text-white hover:text-yellow-200">
            Login
        </a>
        );
    if (user) return (
        <div className="text-white">Hello {user.name}!
            <div>
                <a href="/api/auth/logout" className=" hover:text-yellow-200 end-0">
                    Logout
                </a>
            </div>
            <div>
                <a href="/new-seller" className="text-white end-0">
                    Become a Seller
                </a>
            </div>
        </div>
    );
}