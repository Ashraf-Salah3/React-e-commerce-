import ProductCard from "../productCard/ProductCard";
import styles from "./categoryProduct.module.scss";
import { useFetchCategories } from "../../../context/FetchCategory";
import { useProducts } from "../../../context/FetchProduct";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

const CategoryProduct = () => {
  const { subCategories } = useFetchCategories();
  const {
    setProductFilter,
    productFilter,
    fetchProductExpire,
    productExpire,
    productsSale,
    fetchproductsSale,
    products,
  } = useProducts();
  const { id } = useParams();
  const categoryId =id
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
const categoryName = productFilter?.categoryName

  useEffect(() => {
    const fetchData = async () => {
      if (id === "-2") {
        await fetchProductExpire();
      } else if (id === "-1") {
        await fetchproductsSale();
      }
      setLoading(false);
    };
    fetchData();
  }, [id]); 
  

  const handleSubCategoryFilter = (subId) => {
    setLoading(true); 
    setProductFilter({
      ...productFilter,
      SubCategoryId: subId || null,
      PageIndex: 1,
      SearchName: null,
    });
    setLoading(false);
  };

  const renderTitle = (categoryName) => (
    <div className={styles.title}>
      <h1>{categoryName}</h1>
      <IoIosArrowBack size={25} onClick={() => navigate("/")} />
    </div>
  );

  const renderProducts = () => {
    if (loading) {
      return <p>جاري تحميل البيانات...</p>
    }

    if (id === "-1" && productsSale.length > 0) {
      return (
        <>
          {renderTitle("عروضات")}
          <div className={styles.produtExpire}>
            {productsSale.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      );
    }

    if (id === "-2" && productExpire.length > 0) {
      return (
        <>
          {renderTitle("منتجات شارفت على الانتهاء")}
          <div className={styles.produtExpire}>
            {productExpire.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      );
    }

    if (products.length > 0) {
      return (
        <div className={styles.productGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      );
    }

    return <p>لاتوجد منتجات متاحه في هذا القسم</p>;
  };

  return (
    <div className={styles.categoryProductContainer}>
      {!loading ? (
        <>
          {productExpire.length === 0 && productsSale.length === 0 ?(
            <>
              {renderTitle(
              categoryName
              )}
              <div className={styles.subCat}>
                {categoryId &&
                subCategories[categoryId] &&
                subCategories[categoryId]?.length > 0 && (
                  subCategories[categoryId]?.map((sub) => (
                    <ul key={sub.id}>
                      <li>
                        <button
                          className="--btn"
                          onClick={() => handleSubCategoryFilter(sub.id)}
                        >
                          {sub.name}
                        </button>
                      </li>
                    </ul>
                  ))
                )}
              </div>
            </>
          ) : null}
  
          {}
          {renderProducts()}
        </>
      ) : (
        <p>جاري التحميل....</p>
      )}
    </div>
  );
}  

export default CategoryProduct;
