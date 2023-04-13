import CartItem from './cartItem.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotals, getCartItems } from '../features/cart/cartSlice.js';
import { openModal } from '../features/modal/modalSlice.js';

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems, total, amount, isLoading } = useSelector((store) => store.cart);
  console.log(cartItems, total, amount, isLoading)
  
  useEffect(() => {
    dispatch(getCartItems());
  },[]);

  console.log('isLoading is ...', isLoading)
  
  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  if (amount < 1) {
    return (
      <section className='cart'>
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    )
  }

  return (
    <section className='cart'>
      <header>
        <h2>your bag</h2>
      </header>
      <div className='cart-content'>
        {cartItems.map((item) => <CartItem key={item.id} {...item} />)}
      </div>
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button 
          onClick={() => dispatch(openModal())}
          className='btn clear-btn'
        >
          clear cart
        </button>
      </footer> 
    </section>
  )
};

export default CartContainer;