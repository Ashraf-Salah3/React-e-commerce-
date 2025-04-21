import { useNavigate } from "react-router-dom";
import styles from "./product-card.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import {
  ADD_TO_FAVORITE,
  REMOVE_FROM_FAVORITE,
} from "../../../store/favoriteSlice";
import React, { useState } from "react";
import { useProducts } from "../../../context/FetchProduct";
import { FaCartPlus, FaShekelSign } from "react-icons/fa";
import { toast } from "react-toastify";
import ProductPopup from "../../ProductPopup/ProductPopup";

const ProductCard = React.memo(({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteData = useSelector((state) => state.favorite.favoriteData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFavorite = favoriteData.some((item) => item.id === product.id);
  const { getProductColor } = useProducts();

  const handleProductDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const openModal = async () => {
    try {
      await getProductColor(product.id);
      setIsModalOpen(true);
    } catch (error) {
      toast.error("لا توجد الوان لهذا المنتج:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFavoriteClick = () => {
    if (!isFavorite) {
      dispatch(ADD_TO_FAVORITE({ ...product, price: product.price }));
    } else {
      dispatch(REMOVE_FROM_FAVORITE(product));
    }
  };

  return (
    <div className={styles["productCard-container"]}>
      <div className={styles.img} onClick={handleProductDetails}>
        <img src={product.imageCover} alt={product.name} />
      </div>
      <div>
        <button
          onClick={handleFavoriteClick}
          className={`${styles["favorite-btn"]} ${
            isFavorite ? styles["active"] : ""
          }`}
        >
          {isFavorite ? (
            <MdFavorite
              size={35}
              className={`${styles["favorite-icon"]} ${styles.active}`}
            />
          ) : (
            <MdFavoriteBorder size={35} className={styles["favorite-icon"]} />
          )}
        </button>
      </div>
      <div className={styles["product-details"]}>
        <div
          className={`${
            product?.saleDiscount !== null ? styles.descound : styles.desc
          }`}
        >
          <p>{product.name.slice(0, 15)}</p>
          <div className={styles.price}>
            <p className={styles.mainprice}>{product.price} ج.م</p>
            {product?.saleDiscount !== null && (
              <p className={styles["sale-price"]}>
                {product.price - product?.saleDiscount} {""}
                ج.م
              </p>
            )}
          </div>
        </div>
        <button className="--btn --add-to-card" onClick={openModal}>
          {" "}
          أضف الي السله <FaCartPlus size={20} />
        </button>
      </div>

      {product && (
        <ProductPopup
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          product={product}
        />
      )}
    </div>
  );
});

export default ProductCard;
