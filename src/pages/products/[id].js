import Image from "next/image";
import loadProducts from "src/libs/loadProducts";
import Book from "src/components/book";

export default function BookPage ({ book }) {
    return (
        <Book book={book} />
      );
}

export async function getStaticPaths() {
  const products = await loadProducts();
  
  const paths = products.map(product => ({
    params: {id: product.id.toString()},
  }))

  return {
      paths,
      fallback: "blocking"
  };
}

export async function getStaticProps({ params }) {
  const products = await loadProducts();   

  const book = products.find((book) => book.id.toString() === params.id)
  
  return { 
    props: { 
      book,
    } 
  };
}
