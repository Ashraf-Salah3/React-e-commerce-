import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

import store from "./store";
import { CategoryProvider } from './context/FetchCategory';  // Correct import
import { ProductProvider } from './context/FetchProduct';  // Correct import
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Modal from "react-modal";  // Use react-modal here

// Set the app element for accessibility
Modal.setAppElement("#root");

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ProductProvider>
        <CategoryProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </CategoryProvider>
      </ProductProvider>
    </Provider>
  </BrowserRouter>
);
