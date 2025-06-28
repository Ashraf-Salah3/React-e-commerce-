import "./App.css";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./component/header/Header";
import { Footer } from "./component/footer/Footer";
import Home from "./pages/home/Home";
import ProductDetails from "./component/products/productDetails/ProductDetails";
import Cart from "./component/Cart/Cart";
import Checkout from "./component/checkout/Checkout";
import Favorite from "./component/favorite/Favorite";
import CategoryProduct from "./component/products/categoryProduct/CategoryProduct";
import { Fragment } from "react";
import Admin from "./pages/admin/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProducts } from "./context/FetchProduct";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggleButton from "./component/tooggelButton/ThemeToggleButton";
import ContactUsButton from "./component/contactUsButton/ContactUsButton";
import Login from "./pages/login/Login";
import NotFound from "./component/notFound/NotFound";
import SearchResult from "./component/searchResult/SearchResult";

const App = () => {
  const location = useLocation();
  const { products } = useProducts();

  const isSpecialPage =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/admin");

  return (
    <Fragment>
      {!isSpecialPage && (
        <ThemeProvider>
          <ThemeToggleButton />
        </ThemeProvider>
      )}
      <ToastContainer />
      {!isSpecialPage && <ContactUsButton />}
      {!isSpecialPage && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/search-results/:searchText" element={<SearchResult />} />
        <Route
          path="/category/:id"
          element={<CategoryProduct products={products} />}
        />
        <Route
          path="/admin/*"
          element={
            // localStorage.getItem("authToken") ? (
              <Admin />
            // ) : (
            //   <Navigate to="/login" replace />
            // )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound/>} />
        <Route path="/admin/*" element={<NotFound/>} />
      </Routes>
      
      {!isSpecialPage && <Footer />}
    </Fragment>
  );
};

export default App;
