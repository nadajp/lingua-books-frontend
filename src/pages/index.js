import BookGrid from "src/components/BookGrid";
import loadProducts from 'src/services/loadProducts'

export default function Home({ products }) {

  return (
   <BookGrid books={ products }/>
  )
}
export async function getServerSideProps() {
  console.log('index.js Loading Products...');
    const products = await loadProducts();  
    
    return { props: { products } };
}



