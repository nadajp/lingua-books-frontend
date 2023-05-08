import Image from "next/image";

export default function Book({ book }) {
  const src = `data:image/jpeg;base64,${book.image}`;
  return (
    <div className="grid grid-cols-2 gap-4 my-5">
        <div className="relative w-72 h-72 sm:w-96 sm:h-96">
          <Image
              src={src}
              alt={book.name} 
              sizes="100"
              fill
              accept="image/jpeg,image/png"
              style={{
                  objectFit: 'contain'
              }}
          /> 
        </div>
      <div>
            <h2 className="text-xl font-bold mb-2">{book.name}</h2>
            <h3 className="text-lg font-medium mb-2">{book.author}</h3>
            <p className="text-gray-600 mb-2">{`Price: $${book.price}`}</p>
            <p className="text-gray-600 mb-2">{`Condition: ${book.condition}`}</p>
            <p className="text-gray-600 mb-2">{`Publisher: ${book.publisher}`}</p>
            <p className="text-gray-600 mb-2">{`Year of Publishing: ${book.year}`}</p>
            <p className="text-gray-600 mb-2">{`Format: ${book.format}`}</p>
            <p className="text-gray-600 mb-2">{`Length: ${book.length} pages`}</p>
            <p className="text-gray-600 mb-2">{`Language: ${book.language}`}</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>    
      </div>
  );
}
