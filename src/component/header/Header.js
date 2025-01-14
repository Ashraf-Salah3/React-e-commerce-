import { useEffect, useState, useCallback } from "react";
import styles from "./header.module.scss";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaCartPlus, FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Logo, searchHeader } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCategories } from "../../context/FetchCategory";
import { CALCULATE_TOTAL_QUANTITY } from "../../store/cartSlice";
import { useProducts } from "../../context/FetchProduct";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage, setScrollPage] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const productData = useSelector((state) => state.cart.productData);
  const { categories, subCategories } = useFetchCategories();

  const { setProductFilter, productFilter, products,  setProductExpire,
    setProductSale } = useProducts()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fixNavbar = () => setScrollPage(window.scrollY > 50);
    window.addEventListener("scroll", fixNavbar);
    return () => window.removeEventListener("scroll", fixNavbar);
  }, []);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch]);

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const hideMenu = useCallback(() => {
    setShowMenu(false);
    setOpenDropdown(null);
  }, []);

  const toggleDropdown = useCallback((index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  }, []);

  const handleSearchChange = useCallback(
    (event) => {
      const searchValue = event.target.value;
      setSearchText(searchValue);
      if (searchValue.length > 0) {
        setProductFilter({
          ...productFilter,
          SearchName: searchValue,
        });

        setShowSearchMenu(true);
      } else {
        setShowSearchMenu(false);
      }
    },
    [products]
  );

  const handleSearchKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && searchText.trim() !== "") {
        setShowSearchMenu(false);
        navigate(`/search-results/${searchText}`);
      }
    },
    [searchText, navigate]
  );

  const handleDropdownSearch = useCallback(
    (product) => {
      navigate(`/product/${product.id}`, { state: { item: product } });
      setSearchText("");
      setShowSearchMenu(false);
    },
    [navigate]
  );

  const handleSubCategoryFilter = useCallback(
    (subId, categoryId) => {
      setProductFilter({
        ...productFilter,
        SubCategoryId: subId || null,
        PageIndex: 1,
      });
      navigate(`/category/${categoryId}?subCategoryId=${subId}`, {
        state: subId,
      });
    },
    [productFilter, navigate, setProductFilter]
  );

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
    navigate(`/category/${category.id}`);
  };

  const activeLink = ({ isActive }) => (isActive ? styles.active : "");

  return (
    <header className={scrollPage ? styles.fixed : ""}>
      <div className={styles.header}>
        <div className={styles["header-top"]}>
          <div className={styles["header-right"]}>
            <div className={styles["menu-icon"]}>
              <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
            </div>
            <div className={styles["header-top-item"]}>
              <div className={styles.logo}>
                <Logo />
                <Link to="/cart">
                  <div className={styles.cart} onClick={hideMenu}>
                    <FaCartPlus size={27} />
                    <span>{productData.length}</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.search}>
            <img
              src={searchHeader}
              alt="search"
              className={styles["search-img"]}
            />
            <input
              className="--input"
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="ابحث عن منتجاتك"
            />
            {showSearchMenu && products.length > 0 && (
              <div>
                <div
                  className={styles["overlay"]}
                  onClick={() => setShowSearchMenu(false)}
                ></div>
                <ul className={styles["dropdown-search"]}>
                  {products.map((product) => (
                    <li
                      key={product.id}
                      className={styles["dropdown-item"]}
                      onClick={() => handleDropdownSearch(product)}
                    >
                      <span className={styles["product-name"]}>
                        {product.name}
                      </span>
                      <img
                        src={product.imageCover}
                        alt={product.name}
                        className={styles["product-image"]}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <nav className={showMenu ? styles["show-nav"] : styles["hide-nav"]}>
          <div
            className={`${styles["nav-wrapper"]} ${
              showMenu ? styles["show-nav-wrapper"] : ""
            }`}
            onClick={hideMenu}
          ></div>
          <div className={styles.links}>
            <ul>
              <li className={styles["logo-mobile"]}>
                <FaTimes size={22} onClick={hideMenu} />
                <div>
                  <Logo />
                </div>
              </li>
              <li>
                <NavLink
                  to="/favorite"
                  onClick={hideMenu}
                  className={activeLink}
                >
                  المفضله
                </NavLink>
              </li>
              <li>
                <NavLink to="/" onClick={hideMenu} className={activeLink}>
                  الكل
                </NavLink>
              </li>
              {categories?.map((category) => (
                <li
                  key={category.id}
                  onMouseEnter={() => toggleDropdown(category.id)}
                  onClick={() => handleCategoryChange(category)}
                >
                  <NavLink
                    to={`/category/${category.id}`}
                    className={activeLink}
                    onClick={hideMenu}
                  >
                    {category.name}
                  </NavLink>

                  {openDropdown === category.id &&
                    subCategories[category.id]?.length > 0 && (
                      <ul
                        className={styles["dropdown-menu"]}
                        onMouseLeave={() => {
                          setOpenDropdown(null);
                        }}
                      >
                        {subCategories[category.id].map((sub) => (
                          <li
                            key={sub.id}
                            onClick={() => {
                              handleSubCategoryFilter(sub.id, category.id);
                              hideMenu();
                            }}
                          >
                            {sub.name}
                          </li>
                        ))}
                      </ul>
                    )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
