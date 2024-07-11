import React, { useEffect, useState } from 'react';
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux';
import { increment } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

function ManHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let response = await axios.get("http://localhost:3000/man/allManProducts");
      setData(response.data.data);
      setFeatured(response.data.data.slice(0, 3)); 
    } catch (error) {
      console.log('Get All Products Error', error);
    }
  };

  const handleProductClick = (productId, gender) => {
    navigate('/detail', { state: { productId, gender } });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-[#ceca76] to-[#c8c7b6] z-[-1]"></div>
      <div className="relative w-full h-[650px] overflow-hidden" style={{ position: 'relative', top: '-15px' }}>
        <Slider {...settings}>
          {featured.map((item, index) => (
            <div key={index} className="w-full h-full flex items-center justify-center">
              <img
                src={item.image}
                alt={`Featured ${index}`}
                className="w-full h-[600px] max-h-full object-cover flex items-center justify-center"
              />
            </div>
          ))}
        </Slider>
      </div>

      <h1 className="text-5xl font-bold text-gray-900 dark:text-stone-400 mb-4 text-center">All Man Products</h1>

      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {data && data.map((product, key) => (
          <div 
            key={key}
            className="relative w-full max-w-sm border-stone-400 border-4 bg-lime-200 rounded-lg dark:bg-stone-200 dark:border-stone-400 group"
            style={{ minHeight: "450px" }}
            onClick={() => handleProductClick(product._id, 'man')}
          >
            <img
              className="p-8 rounded-t-lg w-full"
              style={{ height: "350px", objectFit: "cover" }}
              src={product.image}
              alt="product image"
            />
            <div className="px-5 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-stone-400 dark:text-stone-400">
                {product.nameOfProduct}
              </h5>
              <div className="flex items-center justify-between">
                {product.discountAmount > 0 ? (
                  <>
                    <span className="text-2xl font-bold text-stone-400 dark:text-stone-400 line-through mr-2 group-hover:hidden">
                      {product.price} TL
                    </span>
                    <span className="text-3xl font-bold text-green-600 dark:text-green-600 group-hover:hidden">
                      {product.price * ((100 - product.discountAmount) / 100)} TL
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-stone-400 dark:text-stone-400 group-hover:hidden">
                    {product.price} TL
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(increment(product));
                  }}
                  className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:white group-hover:block hidden"
                >
                  Add to Basket
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ManHome;
