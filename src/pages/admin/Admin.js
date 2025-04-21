import Sidebar from '../../component/admin/sidebar/Sidebar';
import styles from "./admin.module.scss";
import { Route, Routes } from 'react-router';
import ProfilePage from '../../component/admin/profilePage/ProfilePage';
import Products from '../../component/admin/products/Products';
import Categories from '../../component/admin/products/categories/Categories';
import AddProducts from '../../component/admin/products/addProduct/AddProducts';
import EditPublishedProduct from '../../component/admin/products/editProduct/EditPublishedProduct';
import AdvertisingPage from '../../component/admin/AdvertisingPage/AdvertisingPage';
import { useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import EditCategory from '../../component/admin/products/categories/editeCategory/EditCategory';
import AddNewCategories from '../../component/admin/products/categories/AddNewCategories';
import SubCategoryList from '../../component/admin/products/supCategory/SubCategoryList';
import EditSubCategory from '../../component/admin/products/supCategory/EditSubCategory';
import AddNewSubCategory from '../../component/admin/products/supCategory/AddNewSubCategory';
import EditProductFeature from '../../component/admin/EditProductFeature/EditProductFeature';
import AddSize from '../../component/admin/EditProductFeature/addSize/AddSize';
import Orders from '../../component/admin/orders/Orders';
import OrdersDetails from '../../component/admin/orders/OrderDetais/OrdersDetails';
import AddStory from '../../component/admin/AdvertisingPage/addStory/AddStory';
import AddAdvertise from '../../component/admin/AdvertisingPage/addAdvertis/AddAdvertise';
import Register from '../../component/admin/register/Register';

const Admin = () => {
 
  const navigate = useNavigate();

  
  const token = localStorage.getItem('authToken');

  useEffect(() => {

    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]); 

  if (!token) {
    return null;
  }
  

  return (
    <div className={styles.adminPage}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
      <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/newProduct" element={<AddProducts />} />
          <Route path="/editProduct" element={<EditPublishedProduct />} />
          <Route path="/advertising" element={<AdvertisingPage />} />
          <Route path="/categories/edit/:id" element={<EditCategory />} />
          <Route path='/addNewCategory' element={<AddNewCategories/>}/>
          <Route path='/addNewSubCategory' element={<AddNewSubCategory/>}/>
          <Route path='/subcategories' element={<SubCategoryList/>}/>
          <Route path='/editproductFeature' element={<EditProductFeature/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/editSubCategory/:categoryId/:subCategoryId' element={<EditSubCategory/>}/>
          <Route path='/orderDetails/:id' element={<OrdersDetails/>}/>
          <Route path='/addSize' element={<AddSize/>}/>
          <Route path='/addStory' element={<AddStory/>}/>
          <Route path='/advertis' element={<AddAdvertise/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
