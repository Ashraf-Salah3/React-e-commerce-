
import styles from "./products.module.scss";

import ProductList from "./productList/ProductList";



const Products = () => {
  return (
    <div className={styles.productPage}>
      <ProductList/>

    </div>
  );
};

export default Products;
