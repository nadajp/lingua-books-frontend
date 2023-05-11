import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href='/' className="flex items-center space-x-2">
            <Image src="/logo-no-bg.png" alt="Logo" width={80} height={70}/>
            <span className="hidden sm:inline-block font-demibold text-3xl text-white">
                LINGUA BOOKS
            </span>
        </Link>
    )
}