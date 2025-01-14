import React, { useState } from "react";
import styles from "./product-popup.module.scss";
import Modal from "react-modal";
import { useProducts } from "../../context/FetchProduct";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../../store/cartSlice";
import { toast } from "react-toastify";


const ProductPopup = ({ isModalOpen, product, closeModal }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const { sizes, getSize, colors } = useProducts();
  const [showSize, setShowSize] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.productData);


  const handleProductColor = async (color) => {
    try {
      setShowSize(true);
      await getSize(color.id);
      setSelectedColor(color.color);
    } catch (error) {
      toast.error("Error fetching sizes:", error);
    }
  };

  const handleSizeSelect = async (size) => {
      setSelectedSize(size);
      setShowButtons(true);
   
  };
  const resetState = () => {
    setSelectedColor(null);
    setSelectedSize(null);
    setShowSize(false);
    setShowButtons(false);
  };

  const handleCloseModal = () => {
    resetState();
    closeModal();
  };

  const addToCart = () => {
    if (!selectedColor || !selectedSize) return;
    const isProductInCart = cart.some(
      (item) =>
        item.id === product.id &&
        item.color === selectedColor &&
        item.sizeId === selectedSize.id
    );

    if (isProductInCart) {
      toast.info("المنتج موجود بالفعل في عربة التسوق");
      closeModal()
      return;
    }
    dispatch(
      ADD_TO_CART({
        ...product,
        price: selectedSize?.price,
        size: selectedSize?.size,
        totalQuantity: selectedSize?.quantity,
        color: selectedColor,
        sizeId : selectedSize.id,
        quantity:1
      })
    );
    handleCloseModal();
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        aria-labelledby="product-modal"
        aria-describedby="product-modal-description"
        className={styles["custom-modal"]}
        overlayClassName={styles["custom-overlay"]}
      >
        <p>المنتج: {product.name}</p>

        {!showSize && (
          <div className={styles["color-selector"]}>
            <h3>يرجى اختيار اللون:</h3>
            <div className={styles["color-options"]}>
              {colors?.length > 0 ? (
                colors.map((color, index) => (
                  <div key={index}>
                    <button
                      style={{
                        backgroundImage: `url(${color.imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        border:
                          selectedColor === color.id
                            ? "3px solid black"
                            : "1px solid #ccc",
                        padding: "25px",
                      }}
                      onClick={() => handleProductColor(color)}
                    ></button>
                    <h3>{color.color}</h3>
                  </div>
                ))
              ) : (
                <p>لا توجد الوان متاحه لهذا المنتج</p>
              )}
            </div>
          </div>
        )}

        {showSize && (
          <div>
            <h4>يرجي اختيار المقاس:</h4>
            <div className={styles["size-options"]}>
              {sizes?.length > 0 ? (
                sizes.map((size) => (
                  <button
                  className={styles["size-button"]}
                    key={size.id}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size.size}
                  </button>
                ))
              ) : (
                <p>لا توجد مقاسات متاحه لهذا المنتج</p>
              )}
            </div>
          </div>
        )}
        {showButtons && (
          <div  className={styles["action-buttons"]}
          >
            <button
              onClick={addToCart}
              className={styles["confirm-button"]}
             
            >
              تأكيد
            </button>
            <button
            className={styles["cancel-button"]}
              onClick={closeModal}
            >
              إلغاء
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductPopup;
