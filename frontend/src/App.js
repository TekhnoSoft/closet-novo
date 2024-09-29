import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainContext } from "./helpers/MainContext";
import { Cart, Home, Porduct, Search } from "./pages";
import { BottomTabNavigation, Header } from "./components";
import { useState } from "react";
import Utils from "./Utils";
import useCart from "./hooks/CartHook";

function App() {

  const [user, setUser] = useState(false);

  const [pageIndex, setPageIndex] = useState(Number(localStorage.getItem("closetnovo_bottomtab_index") || 1));

  const cart = useCart();

  return (
    <Router>
      <MainContext.Provider value={{cart, user}}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<Porduct />} />
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