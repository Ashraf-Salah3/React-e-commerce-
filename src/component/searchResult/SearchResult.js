import React, { useEffect } from "react";
import { useProducts } from "../../context/FetchProduct";
import ProductCard from "../products/productCard/ProductCard";
import styles from "./searhresult.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const SearchResult = () => {
  const { setProductFilter, products } = useProducts();
  const { searchText } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchText || searchText.trim().length === 0) {
      setProductFilter((prevFilter) => ({
        ...prevFilter,
        SearchName: null,
      }));
      return;
    }
    setProductFilter((prevFilter) => ({
      ...prevFilter,
      SearchName: searchText.trim(),
    }));
  }, [searchText, setProductFilter]);

  return (
    <div className={styles["search-container"]}>
      <div className={styles.title}>
        <h1>نتائج البحث عن {searchText || "لا شيء"}</h1>
        <IoIosArrowBack size={25} onClick={() => navigate("/")} />
      </div>
      <div className={styles.search}>
        {searchText && products && products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <p>لا توجد منتجات مطابقة لبحثك.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
