import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Paper } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import axios from 'axios';
import { clearCart } from '../store/slices/cartSlice';
import '../index.css';
import { toast } from 'react-toastify';

function Buy() {
  const { products } = useSelector(state => state.cart); 
  const { username } = useSelector(state => state.user);
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleApprove = async () => {
    try {
      const orderData = {
        username,
        products: products.map(product => ({
          _id: product._id,
          nameOfProduct: product.nameOfProduct,
          image: product.image,
          cartQuantity: product.cartQuantity,
          price: product.price
        })),
        totalPrice: products.reduce((total, product) => total + product.cartQuantity * product.price, 0),
        address
      };
      
      console.log('Order Data:', orderData); // Hata ayıklamak için

      const response = await axios.post('http://localhost:3000/order/create', orderData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.data.status) {
        toast.success(response.data.message);
        dispatch(clearCart());
        navigate('/orders');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      console.error('Error response data:', error.response.data);
      toast.error('Failed to create order.');
    }
  };

  return (
    <div className='flex flex-col items-center h-screen w-screen' style={{ backgroundImage: 'linear-gradient(to right, #FFD700, #32CD32)' }}>
      <Paper className='p-4 m-4' style={{ minWidth: '300px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <Typography variant="h4" gutterBottom>
          Buy Products
        </Typography>
        {products.map((product, index) => (
          <div key={index} className="flex justify-between items-center my-2">
            <img src={product.image} alt="product" className="w-16 h-16 object-cover" />
            <Typography variant="body1">{product.nameOfProduct}</Typography>
            <Typography variant="body1">{product.price} TL</Typography>
          </div>
        ))}
        <TextField
          label="Address"
          multiline
          rows={4}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          variant="outlined"
          fullWidth
          className="my-4"
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<PaymentIcon />}
          onClick={handleApprove}
          fullWidth
          style={{ backgroundColor: '#008080', color: 'white' }} 
        >
          Approve
        </Button>
      </Paper>
    </div>
  );
}

export default Buy;
