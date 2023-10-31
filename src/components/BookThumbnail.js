import Image from "next/image";
import Link from "next/link";

export default function BookThumbnail ({ book, index }) {
    return (
    <Link data-testid="book-link"
        href={`/products/${book.id}`} 
        className="group overflow-hidden"
        >
        <div className="relative w-full h-64">
        <Image 
            priority={index === 0 || book.image.includes('placeholder')} 
            src={book.image}
            alt={book.name} 
            sizes="100"
            fill
            accept="image/jpeg,image/png"
            style={{
                objectFit: 'contain'
            }}
        /> 
        </div>
        <div className="relative w-full">
            <p className="mt-1 flex justify-center font-semibold text-md text-red-400">{book.name}</p>
            <p className="flex justify-center text-md text-black">{book.author}</p>
                    {/* <p className="text-lg font-semibold">{formatCurrencyString({
                        currency: product.currency,
                        value: product.price
                    })}</p> */}
            <p className="flex justify-center text-sm text-gray-500 font-semibold">
                ${book.price}
            </p>
            <div className="flex justify-center ">
                <button className="text-sm border rounded-lg py-1 px-4 bg-gray-500 text-yellow-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-opacity-50">
                    Add to Cart
                </button>
            </div>
            <p className="flex justify-center text-sm text-gray-500 font-semibold">
                {book.language.name}
            </p>
        </div>
    </Link>
    );
}