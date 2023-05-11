import loadProducts from "src/services/loadProducts";
import Book from "src/components/book";
import loadProductImage from "src/services/loadProductImage";

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
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
  const res = await fetch(`${API_URL}/${params.id}`);
  
  let book = await res.json();
  if (book.imageUrl) {    
      const image = await loadProductImage(book.imageUrl);          
      book.image = image
  }
  return { 
    props: { 
      book,
      revalidate: 60 * 60 * 24 // 24 hours
    } 
  };
}
