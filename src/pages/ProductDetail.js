import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ProductDetail() {
  const location = useLocation();
  const { productId, gender } = location.state || {}; 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId || !gender) {
      console.error('Missing productId or gender');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        console.log(gender);
    
        const response = await axios.post(`http://localhost:3000/${gender.charAt(0).toLowerCase() + gender.slice(1)}/find${gender.charAt(0).toUpperCase() + gender.slice(1)}Product`, {
          id: productId 
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` 
          }
        });
        setProduct(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, gender]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="flex flex-col items-center h-screen w-screen bg-gradient-to-r from-yellow-600 to-lime-600 p-8 mt-[-17px]">
      <div className="flex bg-white shadow-lg rounded-lg w-full max-w-4xl">
        <img 
          src={product.image} 
          alt={product.nameOfProduct} 
          className="w-1/2 h-96 object-cover rounded-l-lg"
        />
        <div className="p-8 w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.nameOfProduct}</h1>
          <p className="text-xl mb-2">Price: {product.price} TL</p>
          <p className="text-lg">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
