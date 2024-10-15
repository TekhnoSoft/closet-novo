import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainContext } from "./helpers/MainContext";
import { Cart, Home, Product, Search, Menu, Favorite } from "./pages";
import { BottomTabNavigation, Header } from "./components";
import { useState } from "react";
import Utils from "./Utils";
import useCart from "./hooks/CartHook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [user, setUser] = useState(false);

  const [pageIndex, setPageIndex] = useState(Number(localStorage.getItem("closetnovo_bottomtab_index") || 1));

  const cart = useCart();

  return (
    <Router>
      <MainContext.Provider value={{ cart, user }}>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/favorites" element={<Favorite />} />
        </Routes>
        {Utils.mobileCheck() ? (
          <>
            <BottomTabNavigation pageIndex={pageIndex} setPageIndex={setPageIndex} />
          </>
        ) : (null)}
      </MainContext.Provider>
    </Router>
  );
}

export default App;