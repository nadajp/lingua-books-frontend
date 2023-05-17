import BookGrid from '../components/bookGrid'
import loadProducts from 'src/services/loadProducts'
import fetchCategories from 'src/services/fetchCategories';

export default function Category({ categorySlug, subcategorySlug, filteredProducts }) {
  return (
    <div>
      <h1>Category: {categorySlug}</h1>
      <h2>Subcategory: {subcategorySlug}</h2>
      <BookGrid books={filteredProducts} />
    </div>
  )
}

export async function getStaticPaths() {  
  const categories = await fetchCategories();

    // Generate the paths for all categories and subcategories
    const paths = categories.flatMap((category) => {
      const subcategoryPaths = category.subcategories.map((subcategory) => ({
        params: { category: [category.slug, subcategory.slug] },
      }));
  
      return [
        { params: { category: [category.slug] } }, // Path for category without subcategory
        ...subcategoryPaths, // Paths for subcategories
      ];
    });

  return {
    paths,
    fallback: false, // Specify false if you want to return a 404 page for non-existent paths
  };
}

export async function getStaticProps({params}) {   
  const products = await loadProducts();  
  const categories = await fetchCategories();

  const category = params.category[0]
  const subcategory = params.category[1] ? params.category[1] : null;

  // console.log('CATEGORY: ', category);
  // console.log('SUBCATEGORY: ', subcategory);

  const categoryId = categories.find((item) => item.slug === category).id;
  //console.log('CATEGORY ID: ', categoryId);

  const subcategoryId = subcategory ? 
        categories.find((catItem) => catItem.id === categoryId)
        .subcategories.find((subItem) => subItem.slug === subcategory).id
         : null;

  //console.log('SUBCATEGORY ID: ', subcategoryId);

// Fetch the data for the specific category and subcategory
// You can use the category and subcategory parameters to fetch the relevant data from your data source
  let filteredProducts = products.filter((product) => {
    if (subcategory) {
      // Filter by both category and subcategory
      return product.categoryId === categoryId && product.subcategoryId === subcategoryId;
    } else {
      // Filter by category only
      return product.categoryId === categoryId;
    }
  });
    return {
      props: {
        categorySlug: category,
        subcategorySlug: subcategory,
        filteredProducts
      },
    }
  }