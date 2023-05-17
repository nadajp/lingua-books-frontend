export default async function fetchCategories() {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
    let categories = [];
    try {
      const res = await fetch(apiUrl);
      categories =  await res.json();
    } catch (error) {
      console.error('Error loading categories:', error);
    }
    return categories
}