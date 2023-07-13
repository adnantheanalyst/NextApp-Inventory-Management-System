"use client"
import Header from '@/components/Header'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
const [productForm, setProductForm] = useState({})
const [products, setProducts] = useState({})
const [alert, setAlert] = useState("")

  useEffect( () => {
    const fetchProducts = async () => {
      const response = await fetch ('/api/product')
      let rjson = await response.json()
      setProducts(rjson.products)
    }
    fetchProducts()
   
  }, [])

  const addProduct = async (e) => {
    e.preventDefault();
    
    try{
      const response = await fetch ('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productForm)

      });
      if (response.ok) {
        console.log('Product added successfully');
        setAlert("Your Product has been added successfully!!")
        setProductForm({})
      } else {
        console.error('Error adding product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleChange = (e) => {
    setProductForm({...productForm, [e.target.name]: e.target.value})
  }

  return (
    <>
    <div className="container mx-auto px-40">
      
      <Header />
      <div className='text-green-800 text-center'>{alert}</div>
      {/* <h1 className="text-2xl font-bold mb-4">Search a product</h1> */}

        {/* Search Product Form */}
        {/* <form>
          <div className="relative">
            <input type="text" id="searchInput" className="border px-3 py-2 w-full" placeholder="Search for a product" />
            <select className="absolute right-0 top-0 h-full border-l px-2" defaultValue="">
              <option value="">All</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Search</button>
        </form> */}

      {/* Display Current Block */}

      
      <div className="my-4">
        <h1 className="text-2xl font-bold mb-4">Add a Product</h1>

        {/* Add Product Form */}
        <form>
          <div className="mb-2">
            <label htmlFor="productName" className="block text-sm mb-1">Product Slug</label>
            <input value={productForm?.slug || ""} name='slug' onChange={handleChange} type="text" id="productName" className="border px-4 py-2 w-full" />
          </div>
          <div className="mb-2">
            <label htmlFor="quantity" className="block text-sm mb-1">Quantity</label>
            <input value={productForm?.quantity || ""} name='quantity' onChange={handleChange} type="number" id="quantity" className="border px-3 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm mb-1">Price</label>
            <input value={productForm?.price || ""} name='price' onChange={handleChange} type="text" id="price" className="border px-3 py-2 w-full" />
          </div>
          <button onClick={addProduct} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
        </form>

        <h1 className="text-2xl font-bold my-6">Display Current Stock</h1>

        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-sm px-4 py-2">Product Name</th>
              <th className="text-sm px-4 py-2">Quantity</th>
              <th className="text-sm px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product=>{
              return <tr key={product.slug}>
              <td className="border text-sm px-4 py-2">{product.slug}</td>
              <td className="border text-sm px-4 py-2">{product.quantity}</td>
              <td className="border text-sm px-4 py-2">${product.price}</td>
            </tr>
            })}
          </tbody>
        </table>
        
      </div>
      
    </div>
    </>
  )
}
