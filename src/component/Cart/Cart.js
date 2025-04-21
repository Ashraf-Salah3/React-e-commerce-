import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import styles from "./cart.module.scss"
import { priceCart } from '../../assets';
import { Link, NavLink } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { CLEAR_CART } from '../../store/cartSlice';

function Cart() {
  const productData = useSelector(state => state.cart.productData)
  const [totalAmt , setTotalAmt ] = useState("")
  const dispatch = useDispatch()

  useEffect(()=>{
    let price = 0
    productData.map((item)=>{
      price += item.quantity * item.price
      return price
    })
    setTotalAmt(price.toFixed(2))
  },[productData])
  const clearCart = ()=>{
    dispatch(CLEAR_CART())
  }
  return (
    <div className="container">
    <div className={styles["cart-container"]}>
    <CartItem />
      { productData.length > 0 &&
      <div>
      <div className={styles.cartDetails}>
      <div className={styles.cartSummary}>
        <p className={styles.subtotal}>المجموع الكلي  
          <span>{totalAmt} ج.م </span>
        </p>
        </div>
        <NavLink to={"/checkout"} className={`--btn ${styles.button}`}>
        <button className='--btn' >اتمام عمليه الشراء</button>
        </NavLink>
      </div>
      <div className={styles.clear}>
        
      <button className={`--btn ${styles.restCart}`}
      onClick={()=>clearCart()}
      >مسح السله</button> 
     

      <Link to="/" >
    
      <button className={`--btn ${styles["go-shopping"]}`}>
        <span><HiOutlineArrowLeft/></span>
        اذهب للتسوق
      </button>
      </Link>
    </div>
    </div>
      }
    </div>
    </div>
  );
}

export default Cart;
