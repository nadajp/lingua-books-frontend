import Image from "next/image";
import { loadProducts } from "../lib/products";

export default function Book({ book }) {
  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col md:flex-row overflow-hidden">
      <div className="md:w-1/3">
        <Image src={book.imageUrl} alt={`Cover of ${book.title}`} width={200} height={300} />
      </div>
      <div className="p-4 md:w-2/3 flex flex-col justify-between">
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
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const products = await loadProducts();     
  const product = products.find(product => product.id === params.id)

  return { props: { product } };
}
  