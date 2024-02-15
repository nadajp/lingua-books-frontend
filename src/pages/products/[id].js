import loadProducts from "src/services/loadProducts";
import Book from "src/components/Book";
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
    book.image = await loadProductImage(book.imageUrl);    
  } else {
    book.image = '/book-cover-placeholder.png';
  }
  return { 
    props: { 
      book,
      revalidate: 60 * 60 * 24 // 24 hours
    } 
  };
}
