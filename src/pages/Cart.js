import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import { addOneProduct, clearCart, removeItem, removeOneProduct } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';
import YesNoModal from '../components/YesNoModal';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { products } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAll, setIsShowModalAll] = useState(false);
  const [productId, setProductId] = useState('');

  const removeItemFromComponent = async (id) => {
    setIsShowModal(true);
    setProductId(id);
  };

  const onClickYes = () => {
    setIsShowModal(false);
    dispatch(removeItem(productId));
    toast.success("Product Removed!");
  };

  const onClickYesAll = () => {
    setIsShowModalAll(false);
    dispatch(clearCart());
    toast.success("Products Deleted");
  };

  const incrementProduct = (product) => {
    if (product.cartQuantity !== product.quantity) {
      dispatch(addOneProduct(product));
    } else {
      toast.error("No Enough Stock for that Product!");
    }
  };

  const totalPrice = products.reduce((total, product) => total + product.price * product.cartQuantity, 0);

  return (
    <div className='bg-gradient-to-r from-yellow-600 to-lime-600 min-h-screen flex mt-[-17px]'>
      <div className='w-12 flex flex-col justify-center items-center'>
        <div className='transform -rotate-90 text-white text-4xl font-bold'>
          BAZISIBURADA
        </div>
      </div>
      <div className='flex flex-col items-center flex-grow'>
        <TableContainer component={Paper} className='w-full max-w-5xl mt-8'>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img src={product.image} alt='product_image' className='cartImage' />
                  </TableCell>
                  <TableCell>{product.nameOfProduct}</TableCell>
                  <TableCell>{product.price} TL</TableCell>
                  <TableCell align='center'>
                    <IconButton className='mx-2' onClick={product.cartQuantity === 1 ? () => removeItemFromComponent(product._id) : () => dispatch(removeOneProduct(product))}>
                      <RemoveCircleIcon />
                    </IconButton>
                    {product.cartQuantity}
                    <IconButton className='mx-2' onClick={() => incrementProduct(product)}>
                      <AddCircleIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton color='error' onClick={() => removeItemFromComponent(product._id)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className='flex justify-between w-full max-w-5xl m-4 items-center'>
          <Button color='error'
            onClick={() => setIsShowModalAll(true)}
            variant='contained' startIcon={<DeleteOutlineIcon />}>Clear Cart</Button>
          <div className='flex items-center'>
            <span className='text-xl font-bold mr-4'>Total: {totalPrice} TL</span>
            <Button variant='contained' color='success' startIcon={<PaymentIcon />} onClick={() => navigate('/buy')}>
              Go to Payment
            </Button>
          </div>
        </div>
      </div>
      <div className='w-12 flex flex-col justify-center items-center'>
        <div className='transform rotate-90 text-white text-4xl font-bold'>
          BAZISIBURADA
        </div>
      </div>
      <YesNoModal
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        title="Remove From Cart"
        desc="Would you like to remove item from cart?"
        onClickYes={onClickYes}
      />
      <YesNoModal
        isShowModal={isShowModalAll}
        setIsShowModal={setIsShowModalAll}
        title="Clear Cart"
        desc="Would you like to clear cart?"
        onClickYes={onClickYesAll}
      />
    </div>
  );
}

export default Cart;
