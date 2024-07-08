import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../index.css'; // CSS dosyasını dahil edin
import { useDispatch } from 'react-redux';
import { increment } from '../store/slices/cartSlice';

function Home() {
  const [manProducts, setManProducts] = useState([]);
  const [womanProducts, setWomanProducts] = useState([]);
  const [slideIn, setSlideIn] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(() => {
      setSlideIn(prev => !prev);
    }, 4000); // 4 saniye bekletmek için
    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      const manResponse = await axios.get('http://localhost:3000/man/allManProducts');
      const womanResponse = await axios.get('http://localhost:3000/woman/allWomanProducts');
      setManProducts(manResponse.data.data);
      setWomanProducts(womanResponse.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className='flex flex-col items-center bg-gradient-to-r from-[#ceca76] to-[#c8c7b6] '>
      <div className="w-full bg-gradient-to-r h-40 mt-[-20px] from-yellow-600 to-lime-600 py-4 mb-8">
        <h1 className={`text-8xl font-bold text-white text-center ${slideIn ? 'slide-in' : 'slide-out'}`}>
          BAZISIBURADA
        </h1>
      </div>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {manProducts.concat(womanProducts).map((product, index) => (
          <div className="relative w-full max-w-sm border-stone-400 border-4 bg-lime-200 rounded-lg dark:bg-stone-200 dark:border-stone-400 group"
            style={{ minHeight: "450px" }}
            key={index}
          >
            <a href="#">
              <img
                className="p-8 rounded-t-lg w-full"
                style={{ height: "350px", objectFit: "cover" }}
                src={product.image}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-stone-400 dark:text-stone-400">
                  {product.nameOfProduct}
                </h5>
              </a>
              <div className="flex items-center justify-between">
                {product.discountAmount > 0 ? (
                  <>
                    <span className="text-2xl font-bold text-stone-400 dark:text-stone-400 line-through mr-2 group-hover:hidden">
                      {product.price} TL
                    </span>
                    <span className="text-3xl font-bold text-red-600 dark:text-green-600 group-hover:hidden">
                      {product.price * ((100 - product.discountAmount) / 100)} TL
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-stone-400 dark:text-stone-400 group-hover:hidden">
                    {product.price} TL
                  </span>
                )}
                <button
                  onClick={() => dispatch(increment(product))}
                  className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:white group-hover:block hidden"
                >
                  Add to Basket
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
