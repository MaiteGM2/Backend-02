import { useState, useEffect } from 'react'

import './App.css'

function App() {

  const [products, setProducts] = useState(null);

  async function fetchApi() {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      const products = data.products;
      setProducts(products);
    } catch (err){
      console.error('Error in fetch API:', err);
    }
  }

  useEffect(()=> {
    fetchApi()
  }, [])

  return (
    <div className="container-card">

    </div>
  )
}

export default App
