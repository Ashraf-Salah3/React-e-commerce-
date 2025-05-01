import { NavLink } from "react-router-dom";
import styles from "./sidebar.module.scss";
import { logo, search_icon } from "../../../assets";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="الشعار" />
      </div>
      <div className={styles.search}>
        <img src={search_icon} alt="بحث" />
        <input type="text" placeholder="بحث" />
      </div>
      <div className={styles.list}>
        <ul>
          <li>
            <NavLink to="/admin/products" className={activeLink}>
              المنتجات
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/categories" className={activeLink}>
              الفئات
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/subcategories" className={activeLink}>
              الفئات الفرعية
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/editproductFeature" className={activeLink}>
              تعديل ميزات المنتج
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              الطلبات
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/advertising" className={activeLink}>
              الإعلانات
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/admin/register" className={activeLink}>
              إنشاء حساب
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/" className={activeLink}>
              العودة إلى الصفحة الرئيسية
            </NavLink>
          </li>
        </ul>
      </div>
      <hr></hr>
    </div>
  );
};

export default Sidebar;
