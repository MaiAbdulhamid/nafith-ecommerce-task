import Home from "./routes/Home";
import PageNotFount from "./routes/PageNotFound";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import { ProductDetails } from "./routes/ProductDetails";
import CartPage from "./routes/Cart";
import Confirmation from "./routes/Confirmation";

function App() {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="*" element={<PageNotFount />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="/productDetails" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
