import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';  // ✅ Add this
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const { category } = useParams();  // ✅ Get category from URL
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    let filtered = products;

    // ✅ Filter by category if present in URL
    if (category) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Then apply search query on top
    if (searchQuery && searchQuery.length > 0) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilterProducts(filtered);
  }, [products, searchQuery, category]);  // ✅ Add category as dependency

  return (
    <div className='mt-16 flex flex-col'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>
          {category ? category : 'All Products'}  {/* ✅ Dynamic title */}
        </p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-6'>
        {filterProducts
          .filter(product => product.inStock)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>

      {/* ✅ Show message if nothing found */}
      {filterProducts.length === 0 && (
        <p className='text-center text-primary mt-20'>
          No products found in this category.
        </p>
      )}
    </div>
  );
};

export default AllProducts;