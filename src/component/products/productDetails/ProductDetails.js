import { useCallback, useEffect, useState } from "react";

import styles from "./product-details.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  ADD_TO_FAVORITE,
  REMOVE_FROM_FAVORITE,
} from "../../../store/favoriteSlice";
import { ADD_TO_CART } from "../../../store/cartSlice";
import { useProducts } from "../../../context/FetchProduct";
import { IoIosArrowBack, IoMdWarning } from "react-icons/io";
import { FaCartPlus, FaShekelSign } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import instance from "../../../axios";

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState(null); 
  const [selectedColor, setSelectedColor] = useState(null); 
  const [baseQty, setBaseQty] = useState(1);
  const [details, setDetails] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const { sizes, getSize, colors, getProductColor,setSizes } = useProducts();
  const [showColorWarning, setShowColorWarning] = useState(false);
  const [showSizeWarning, setShowSizeWarning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await instance.get(`/Product/${id}`);
        if (response.status === 200) {
          setDetails(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchProductById();
  }, [id]);

  useEffect(() => {
    setSizes([])
    if (details.id) {
      getProductColor(details.id);
    }
  }, [details.id]);

  const handleFavoriteClick = useCallback(() => {
    setIsFavorite((prevState) => !prevState);
    if (!isFavorite) {
      dispatch(ADD_TO_FAVORITE(details));
    } else {
      dispatch(REMOVE_FROM_FAVORITE(details));
    }
  }, [isFavorite, details, dispatch]);

  const validateSelections = () => {
    setShowColorWarning(!selectedColor);
    setShowSizeWarning(!selectedSize);
    return selectedColor && selectedSize;
  };

  const addToCartHandle = () => {
    if (validateSelections()) {
      dispatch(
        ADD_TO_CART({
          ...details,
          price: selectedSize?.price,
          size: selectedSize?.size,
          totalQuantity: selectedSize?.quantity,
          color: selectedColor?.color,
          quantity: baseQty,
          sizeId: selectedSize?.id,
        })
      );
    }
  };

  const handleColorChange = async (color) => {
    try {
      setSelectedColor(color);
      await getSize(color.id);
    } catch (error) {}
  };
 
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % details?.images?.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? details?.images.length - 1 : prevIndex - 1
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className={styles.ProductDetails}>
      <div className={styles.title}>
        <h3>{details.name}</h3>
        <IoIosArrowBack size={25} onClick={() => navigate("/")} />
      </div>
      <div className={styles.details}>
        <div className={styles.image}>
          <div className={`${styles["photo-slider"]}`} {...swipeHandlers}>
            <div className={styles["image-container"]}>
              {isLoading ? (
                <div>جاري التحميل...</div>
              ) : (
                <img
                  src={details?.images[currentIndex]?.imageUrl || details.imageCover
                  }
                  alt="Details"
                />
              )}
            </div>
          </div>
          <div
            className={styles["thumbnail-gallery"]}
            onWheel={(e) => {
              e.currentTarget.scrollLeft += e.deltaY > 0 ? 50 : -50;
            }}
          >
            {details.images &&
              details.images.map((img, index) => (
                <div key={index} onClick={() => setCurrentIndex(index)}>
                  <img
                    src={img.imageUrl}
                    alt={`thumbnail-${index}`}
                    className={currentIndex === index ? styles.active : ""}
                  />
                </div>
              ))}
          </div>
          <div className={styles.favorite}>
            <h3>{details.name}</h3>
            <button
              onClick={handleFavoriteClick}
              className={`${styles["favorite-btn"]} ${
                isFavorite ? styles["active"] : ""
              }`}
            >
              {isFavorite ? (
                <MdFavorite
                  size={30}
                  className={`${styles["favorite-icon"]} ${styles.active}`}
                />
              ) : (
                <MdFavoriteBorder
                  size={30}
                  className={styles["favorite-icon"]}
                />
              )}
            </button>
          </div>
          <div>
          <p>{details.description}</p>
          </div>
        </div>

        <div className={styles.description}>
        <p>الكميه: {selectedSize?.quantity}</p>
          <div className={styles.price}>
            {localStorage.getItem("authToken") ? (
              <div className={styles["product-price"]}>
                <p
                  className={
                    details?.tradeDiscount !== null
                      ? styles.sale
                      : styles.discountPrice
                  }
                >
                  <FaShekelSign size={15} />
                  {isNaN(selectedSize?.costPrice)
                    ? (
                        Number(selectedSize?.costPrice) ||
                        Number(details?.price)
                      ).toFixed(2)
                    : selectedSize?.costPrice.toFixed(2)}
                </p>
                {details?.tradeDiscount !== null && (
                  <p className={styles["sale-price"]}>
                    <FaShekelSign size={15} />
                    {Number(details.price - details?.tradeDiscount).toFixed(2)}
                  </p>
                )}
              </div>
            ) : (
              <div className={styles["product-price"]}>
                <p
                  className={
                    details?.saleDiscount !== null
                      ? styles.sale
                      : styles.discountPrice
                  }
                >
                  <FaShekelSign size={22} />
                  {isNaN(selectedSize?.price)
                    ? (
                        Number(selectedSize?.price) || Number(details?.price)
                      ).toFixed(2)
                    : selectedSize?.price.toFixed(2)}
                </p>
                {details?.saleDiscount !== null && (
                  <p className={styles["sale-price"]}>
                    <FaShekelSign size={15} />
                    {Number(details.price - details?.saleDiscount).toFixed(2)}
                  </p>
                )}
              </div>
            )}

            {!details.isPriceSame && <span>ملاحظة: السعر يختلف حسب الحجم</span>}
          </div>

          {showColorWarning && (
            <div className={styles.warring}>
              <span className={styles.icon}>
                <IoMdWarning />
              </span>
              عذرا قم باختيار اللون
            </div>
          )}
          <div className={styles["color-selector"]}>
            <h3>يرجى اختيار اللون:</h3>
            <div className={styles["color-options"]}>
              {colors.map((color, index) => (
                <button
                  key={index}
                  style={{
                    backgroundImage: `url(${color?.imageUrl})`,
                    backgroundSize: "cover",
                    objectFit:"cover",
                    border:
                      selectedColor?.imageUrl === color?.imageUrl
                        ? "2px solid var(--main-color)"
                        : "2px solid var(--section-background)",
                    padding: "30px",
                    transition: ".3s",
                    borderRadius: "6px",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  onClick={() => handleColorChange(color)}
                ></button>
              ))}
            </div>
          </div>

          {showSizeWarning && (
            <div className={styles.warring}>
              <span className={styles.icon}>
                <IoMdWarning />
              </span>
              عذرا قم باختيار المقاس
            </div>
          )}

          <div className={styles.size}>
            <h3>يرجى اختيار القياس:</h3>
            <div className={styles["button-size"]}>
              {sizes.map((size) => (
                <button
                  key={size.id}
                  className={`--btn ${
                    selectedSize === size ? `${styles.selected}` : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.quantity}>
            <h3>الكميه</h3>
            <div className={styles["qantity-items"]}>
              <span className={styles.quantityNumber}>{baseQty}</span>
              <div className={styles["qantity-button"]}>
                <button
                  className={`--btn ${styles.incrementButton}`}
                  onClick={() => {
                    if (baseQty < selectedSize?.quantity) {
                      setBaseQty(baseQty + 1);
                    }
                  }}
                >
                  +
                </button>

                <button
                  className={`--btn ${styles.decrementButton}`}
                  onClick={() => {
                    setBaseQty(baseQty === 1 ? baseQty : baseQty - 1);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          </div>

          <button className="--btn --add-to-card" onClick={addToCartHandle}>
            أضف الي السله <FaCartPlus size={27} />
          </button>
        </div>
        <div className={styles.dimentions}>
          <div className={styles.measurmentImg}>
            <img
              src={details?.explainChartImage?.imageUrl}
              alt="Explain ChartImage"
            />
          </div>
          <div className={styles.measurmentImg}>
            <img
              src={details?.measurmentChartImage?.imageUrl}
              alt="measurment chart"
            />
          </div>
        </div>
      </div>
      <div className={styles["policies-container"]}>
        <h3>سياساتنا في العمل:</h3>
        <div className={styles.policies}>
        <div>
          <h3>الدفع والتوصيل:</h3>
          <p>
            ببساطة نقوم بايصال المنتج لغاية منزلك وتقوم بدفع الثمن لموظف التوصيل
          </p>
        </div>
        <div>
          <h3>التبديل:</h3>
          <p>تقوم بتواصل معنا عبر الواتس اب و تدفع تكلفة التوصيل</p>
        </div>
        <div>
          <h3>الغاء الطلب:</h3>
          <p>تواصل معنا عبر الواتس اب ل إلغاء الطلب</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProductDetails;
