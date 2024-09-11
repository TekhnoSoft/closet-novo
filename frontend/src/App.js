import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainContext } from "./helpers/MainContext";
import { Cart, Home, Search } from "./pages";
import { BottomTabNavigation, Header } from "./components";
import { useState } from "react";
import Utils from "./Utils";
import useCart from "./hooks/CartHook";

function App() {

  const [pageIndex, setPageIndex] = useState(Number(localStorage.getItem("closetnovo_bottomtab_index") || 1));
  const [pageIndexDesktop, setPageIndexDesktop] = useState(Number(localStorage.getItem("closetnovo_bottomtab_index_desktop")) || 1);

  const cart = useCart();

  return (
    <Router>
      <MainContext.Provider value={cart}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
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