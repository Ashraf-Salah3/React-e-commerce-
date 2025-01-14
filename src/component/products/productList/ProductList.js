import styles from "./product-list.module.scss";
import ProductCard from "../productCard/ProductCard";
import { useProducts } from "../../../context/FetchProduct";
import { useEffect, useState } from "react";
import instance from "../../../axios";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const {
    loading,
    setProductExpire,
    fetchProductExpire,
    productExpire,
    fetchproductsSale,
    productsSale,
    setProductSale,
    setProductFilter,
    productFilter
  } = useProducts();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await instance.get("/Category/products");
        setCategories(response.data.data);
      } catch (err) {
        setError("حدث خطأ أثناء تحميل الفئات. حاول مرة أخرى لاحقًا.");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProductExpire();
    fetchproductsSale();
  }, []);


  const handleCategoryChange = (category) => {
    setProductExpire([]);
    setProductSale([]);
    setProductFilter({
      ...productFilter,
      CategoryId: category.id || null,
      SubCategoryId: null,
      PageIndex: 1,
      SearchName: null,
      categoryName:category.name
    });
    navigate(`/category/${category.id? category.id :category}`);
  };

  
  return (
    <div className={styles.productList}>
      <div className="container">
        {error && <p className={styles.error}>{error}</p>}
        {loading && <p>جاري تحميل المنتجات...</p>}

        {!loading && categories.length > 0 ? (
          <div className={styles.productsGrid}>
            {categories.map((category, index) => (
              <div key={index}>
                <div className={styles["category-header"]}>
                  <h2>{category.name}</h2>
                  <button
                    className="--btn"
                    onClick={() => handleCategoryChange(category)}
                  >
                    شاهد الكل <IoIosArrowBack size={20} />
                  </button>
                </div>
                <div
                  className={styles["product-container"]}
                  onWheel={(e) => {
                    e.currentTarget.scrollLeft += e.deltaY > 0 ? 50 : -50;
                  }}
                >
                  {category.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p>لا توجد منتجات متاحة حاليًا.</p>
        )}

        <div>
          <div className={styles["category-header"]}>
            <h2>عروضات</h2>
            <button
              className="--btn"
              onClick={() => handleCategoryChange("-1")}
            >
              شاهد الكل <IoIosArrowBack size={20} />
            </button>
          </div>
          <div className={`${styles["product-container"]}  ${styles["sale-product"]}`}>
            {productsSale?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>

        <div>
          <div className={styles["category-header"]}>
            <h2>منتجات شارفت على الانتهاء</h2>
            <button
              className="--btn"
              onClick={() => handleCategoryChange("-2")}
            >
              شاهد الكل <IoIosArrowBack size={20} />
            </button>
          </div>
          <div className={styles["product-container"]}>
            {productExpire?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
        {/*<div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={
                productFilter.PageIndex === index + 1
                  ? ${loading ? styles.pageButton : styles.activePage}
                  : styles.pageButton
              }
            >
              {index + 1}
            </button>
          ))}
        </div>*/}
      </div>
    </div>
  );
};

export default ProductList;
