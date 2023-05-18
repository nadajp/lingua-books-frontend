import BookGrid from "src/components/BookGrid/BookGrid";
import loadProducts from 'src/services/loadProducts'

export default function Home({ products }) {

  return (
   <BookGrid books={ products }/>
  )
}

export async function getStaticProps() {
    const products = await loadProducts();  
    
    return { props: { products } };
}



