import { NavLink } from "react-router-dom";
import styles from "./sidebar.module.scss";
import { logo, search_icon } from "../../../assets";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.search}>
        <img src={search_icon} alt="search" />
        <input type="text" placeholder="search" />
      </div>
      <div className={styles.list}>
        <ul>
          <li>
            <NavLink to="/admin/products" className={activeLink}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/categories" className={activeLink}>
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/subcategories" className={activeLink}>
              sub Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/editproductFeature" className={activeLink}>
              Edit Product Feature
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/advertising" className={activeLink}>
              Advertis
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/register" className={activeLink}>
              Create Account
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className={activeLink}>
              back To Home
            </NavLink>
          </li>
          {/* <li>
          <GoListUnordered style={{backgroundColor: "white", color:"black"}}/>
            <NavLink to="/orders" className={activeLink}>Orders</NavLink>
          </li>
          <li>
            <MdInventory2 />
            <NavLink to="/inventory" className={activeLink}>Inventory</NavLink>
          </li>
          <li>
            <PiCalendarPlusFill />
            <NavLink to="/advertising" className={activeLink}>Advertising</NavLink>
          </li>*/}
        </ul>
      </div>
      <hr></hr>
    </div>
  );
};

export default Sidebar;
