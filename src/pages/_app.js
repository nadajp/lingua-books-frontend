import 'src/styles/globals.css'
import AppLayout from 'src/components/layout'
import CategoryContext from '../contexts/CategoryContext'  
import { useState, useEffect } from 'react';

export default function App({ Component, pageProps }) {
  // const [categories, setCategories] = useState([]);
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  // async function fetchCategories() {
  //   try {
  //     const response = await fetch(`${apiUrl}/categories`); 
  //     const data = await response.json();
  //     console.log('fetched categories' + JSON.stringify(data))
  //     setCategories(data);
  //   } catch (error) {
  //       console.error('Error fetching categories:', error);
  //   }
  // }

  return (
      <AppLayout>
        <Component {...pageProps}/>
      </AppLayout>
  )
}

