import BookGrid from "src/components/bookGrid";
import axios from "axios";

export default function Home({ products }) {
  return (
   <BookGrid books={products} />
  )
}

export async function getStaticProps() {
  try {
    const response = await axios.get('http://localhost:3000/api/products');
    
    const products = response.data;
    return { props: { products } };
  } catch (error) {
    console.error('Error making server call:', error);
    return { props: { products: [] } };
  }
}
