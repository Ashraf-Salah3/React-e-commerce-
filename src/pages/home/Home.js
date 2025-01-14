import Advertis from "../../component/advertis/Advertis";
import HeroSlide from "../../component/heroSlide/HeroSlide";
import ProductList from "../../component/products/productList/ProductList";
import Stories from "../../component/stories/Stories";





const Hoom = () => {

  return (
    <div>
      <HeroSlide />
      <Stories/>
      <Advertis/>
      <ProductList />
    </div>
  );
};

export default Hoom;
