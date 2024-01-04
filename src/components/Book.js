import Image from "next/image";

export default function Book({ book }) {
  return (
    <div className="flex gap-8 my-5">
      <div className="flex-shrink-0 ml-5">
        <Image
          src={book.image}
          alt={book.name}
          layout="intrinsic"
          width={380}  // Adjust the width as needed
          height={380} // Adjust the height as needed
          quality={100}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="flex-grow">
        <h2 className="text-2xl font-bold mb-2">{book.name}</h2>
        <h3 className="text-lg font-medium mb-2">{book.author}</h3>
        <p className="text-gray-600 mb-2">{`Price: $${book.price}`}</p>
        <p className="text-gray-600 mb-2">{`Condition: ${book.condition}`}</p>
        <p className="text-gray-600 mb-2">{`Publisher: ${book.publisher}`}</p>
        <p className="text-gray-600 mb-2">{`Year of Publishing: ${book.publicationYear}`}</p>
        <p className="text-gray-600 mb-2">{`Format: ${book.format}`}</p>
        {book.numberOfPages && <p className="text-gray-600 mb-2">{`Length: ${book.numberOfPages} pages`}</p>}
        <p className="text-gray-600 mb-2">{`Language: ${book.language.name}`}</p>
        {book.description && <p className="text-gray-800 text-sm mb-4">{book.description}</p>}
        <button className="bg-gray-500 text-yellow-300 rounded-md p-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-opacity-50">
          Add to Cart
        </button>
      </div>    
    </div>
  );
}
