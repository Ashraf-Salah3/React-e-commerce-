import { useDispatch, useSelector } from "react-redux";
import styles from "./cartItem.module.scss";
import { MdOutlineClose } from "react-icons/md";

import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Fragment } from "react";
import {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
} from "../../store/cartSlice";
import { priceCart } from "../../assets";
function CartItem() {
  const productData = useSelector((state) => state.cart.productData);
   
  const dispatch = useDispatch();

  const decreaseCartHandle = (product) => {
    dispatch(DECREASE_CART(product));
  };

  const incrementCartHandle = (product) => {

    if(product.quantity < product.totalQuantity ){
    dispatch(ADD_TO_CART(product));
    }
  };

  const closeIconHandel = (product) => {
    dispatch(REMOVE_FROM_CART(product));
  };

  return (
    <Fragment>
      {productData.length > 0 ? (
        <div className={styles.shoppingCartContainer}>
          <div className={styles.header}>
            <h3 className={styles.heading}>السله</h3>
          </div>
          <div className={styles.productList}>
            {productData.map((product) => {
              const { id, name, price, imageCover, quantity } = product;
              return (
                <div className={styles.productItem}  key={`${id}-${name}-${quantity}`}>
                  <img
                    className={styles.productImage}
                    src={imageCover}
                    alt="productImage"
                  />
                  <div className={styles["cart-content"]}>
                    <div className={styles.title}>
                      <p className={styles.productTitle}>
                        {name?.substring(0, 20)}
                        <span>
                        <MdOutlineClose
                          onClick={() => closeIconHandel(product)}
                          className={styles.closeIcon}
                          size="22px"
                        
                        />
                          </span>
                      </p>
                    </div>
                    <p className={styles.productPrice}>
                      {parseFloat(price)?.toFixed(2)}{" "}
                      <img src={priceCart} alt="" />{" "}
                    </p>

                    <div className={styles.quantityContainer}>
                      <div className={styles.quantity}>
                        <div>
                          <p className={styles.quantityLabel}>الكميه</p>
                        </div>
                        <div>
                          <button
                            className={styles.decrementButton}
                            onClick={() => decreaseCartHandle(product)}
                          >
                            -
                          </button>
                          <span className={styles.quantityValue}>
                            {quantity}
                          </span>
                          <button
                            className={styles.incrementButton}
                            onClick={() => incrementCartHandle(product)}
                          >
                            +
                          </button>
                        </div>
                        <p className={styles.totalPrice}>
                          {" "}
                          {quantity * price} <img src={priceCart} alt="" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.cartCleard}>
          <p>
            سلة التسوق الخاصة بك فارغة. يرجى العودة إلى التسوق وإضافة المنتجات
            إلى سلة التسوق{" "}
          </p>
          <Link to="/">
            <button className={`--btn ${styles["go-shopping"]}`}>
              <span>
                <HiOutlineArrowLeft />
              </span>
              اذهب للتسوق
            </button>
          </Link>
        </div>
      )}
    </Fragment>
  );
}

export default CartItem;
