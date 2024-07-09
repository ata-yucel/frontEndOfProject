import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Paper, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import '../index.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const { username } = useSelector(state => state.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/order/user-orders`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          params: {
            username: username
          }
        });

        if (response.data.status) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (username) {
      fetchOrders();
    }
  }, [username]);

  return (
    <div className='flex flex-col items-center h-screen w-screen' style={{ backgroundImage: 'linear-gradient(to right, #FFD700, #32CD32)' }}>
      <Paper className='p-6 m-4 w-3/4' style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h4" gutterBottom>
          My Orders
        </Typography>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="my-6">
              <Typography variant="h6" gutterBottom>
                Order {index + 1}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {order.address}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
              </Typography>
              <Divider className="my-2" />
              <div>
                {order.products.map((product, idx) => (
                  <div key={idx} className="flex justify-between items-center my-2 p-2 border-b-2 border-gray-200">
                    <div className="flex items-center">
                      <img
                        src={product.image} // Ürünün fotoğrafı
                        alt="product"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="ml-4">
                        <Typography variant="body1">
                          <strong>{product.nameOfProduct}</strong>
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {product.quantity} x {product.price} TL
                        </Typography>
                      </div>
                    </div>
                    <Typography variant="body1">
                      <strong>Total:</strong> {product.quantity * product.price} TL
                    </Typography>
                  </div>
                ))}
              </div>
              <Divider className="my-4" />
            </div>
          ))
        ) : (
          <Typography>No orders found.</Typography>
        )}
      </Paper>
    </div>
  );
}

export default Orders;
