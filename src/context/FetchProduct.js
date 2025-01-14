
import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axios";


const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [productExpire, setProductExpire] = useState([]);
  const [productsSale, setProductSale] = useState([]);

  const defaultFilter = {
    CategoryId: null,
    PageIndex: 1,
    pageSize: 12,
    SubCategoryId: null,
    Color: null,
    SearchName: null,
    IsActive: true,
  };

  const [productFilter, setProductFilter] = useState(() => {
    const savedFilter = localStorage.getItem("productFilter");
    const parsedFilter = savedFilter ? JSON.parse(savedFilter) : {};
    return { ...defaultFilter, ...parsedFilter };
  });
  

  useEffect(() => {
    localStorage.setItem("productFilter", JSON.stringify(productFilter));
  }, [productFilter]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const filter = { ...defaultFilter, ...productFilter };
      try {
        const response = await instance.get(
          "/Product",
          {
            params: filter,
          }
        );
        setProducts(response.data.data.items || []);
   
        const totalItems = response.data.data.count || 0

        setTotalPages(Math.ceil(totalItems/productFilter.PageSize))
      } catch (error) {
        setProducts([]);
        setTotalPages(0);
      }  finally {
        setLoading(false);  
      }
    };
    fetchProducts();
  }, [productFilter]);

  
  const getProductColor = async (productId) => {
    try {
      const response = await instance.get(`/Product/colors/${productId}`);
      setColors(response.data.data);
    } catch (error) {
      setColors([])
    }
  };

  const getSize = async (colorId) => {
    try {
      const response = await instance.get(`/Product/sizes/${colorId}`);
      setSizes(response.data.data);
    } catch (error) {
      setSizes([]);
    }
  };
const fetchProductExpire = async ()=>{
  try {
    const response = await instance.get("/Product/expired");
    setProductExpire(response.data.data);
  } catch (err) {}
}
const fetchproductsSale = async ()=>{
  try {
    const response = await instance.get("/Product/discount");
    setProductSale(response.data.data);
  } catch (err) {}
}
  return (
    <ProductContext.Provider
      value={{
        products,
        setProductFilter,
        productFilter,
        colors,
        getProductColor,
        getSize,
        setSizes,
        sizes,
        fetchProductExpire,
        setProductExpire,
        fetchproductsSale,
        productsSale,

        setProductSale,
        productExpire,
        totalPages,
        loading
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
