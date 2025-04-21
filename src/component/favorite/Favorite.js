import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { REMOVE_FROM_FAVORITE } from "../../store/favoriteSlice";
import ProductPopup from "../ProductPopup/ProductPopup";
import styles from "./favorite.module.scss";
import { arrowIcon, priceCart } from "../../assets";
import { useProducts } from "../../context/FetchProduct";
import { MdOutlineClose } from "react-icons/md";

const Favorite = () => {
  const favoriteData = useSelector((state) => state.favorite.favoriteData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { getProductColor } = useProducts();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFavorite = (favorite) => {
    dispatch(REMOVE_FROM_FAVORITE(favorite));
    toast.success("تم حذف المنتج من المفضلة");
  };

  const handleProductDetails = (favorite) => {
    navigate(`/product/${favorite.id}`, {
      state: {
        item: favorite,
      },
    });
  };

  const openModal = async (favorite) => {
    setLoading(true);
    try {
      await getProductColor(favorite.id);
      setSelectedProduct(favorite);
      setIsModalOpen(true);
      setLoading(false);
    } catch (error) {
      toast.error("حدث خطأ أثناء جلب ألوان المنتج");
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container">
      {favoriteData.length > 0 ? (
        <div className={styles["favorite-container"]}>
          <div className={styles["favorit-title"]}>
            <h3 className={styles.heading}>المفضلة</h3>
            <img src={arrowIcon} alt="" onClick={() => navigate("/")} />
          </div>
          <div className={styles["favorite-list"]}>
            {favoriteData.map((favorite) => {
              const { id, name, imageCover, price } = favorite;
              return (
                <div className={styles["favorite-item"]} key={id}>
                  <div className={styles.items}>
                    <div
                      className={styles.img}
                      onClick={() => handleProductDetails(favorite)}
                    >
                      <img src={imageCover} alt={name} />
                    </div>
                    <div className={styles["favorit-details"]}>
                      <div className={styles.title}>
                        <p className={styles.productTitle}>
                          {name.substring(0, 20)}
                        </p>
                        <p className={styles.price}>
                          {price}{" "} ج.م
                        </p>
                      </div>

                      <div className={styles.buttons}>
                        <button
                          className={`--btn ${styles.add}`}
                          onClick={() => openModal(favorite)}
                          disabled={loading}
                        >
                                اشتري المنتج
                        </button>
                        <MdOutlineClose
                          size={22}
                          className={`${styles.remove}`}
                          onClick={() => handleRemoveFavorite(favorite)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles["empty-message"]}>لا توجد منتجات في المفضلة</div>
      )}

      {selectedProduct && (
        <ProductPopup
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Favorite;
