import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainContext } from "./helpers/MainContext";
import { Cart, Home, Product, Search, Menu, Favorite, Register } from "./pages";
import { BottomTabNavigation, Header } from "./components";
import { useEffect, useState } from "react";
import Utils from "./Utils";
import useCart from "./hooks/CartHook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "./Api";

function App() {

  const [loaded, setLoaded] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(false);

  const [pageIndex, setPageIndex] = useState(Number(localStorage.getItem("closetnovo_bottomtab_index") || 1));

  const cart = useCart();

  useEffect(() => {
    onCheckHandleAuth();
  }, [])

  const onCheckHandleAuth = async () => {
    setLoaded(false);
    await Api.user.auth().then(async data => {
      let auth = await data?.data;
      if(auth.success){
        await Api.user.get().then(responseUser => {
          setAuthenticated(true);
          setUser(responseUser?.data?.data);
        })
      }
    }).catch(err => {
      setAuthenticated(false);
      setUser(null);
    });
    setLoaded(true);
  }

  const logout = (forceReload) => {
    localStorage.removeItem("closetnovo_bottomtab_index");
    localStorage.removeItem("closetnovo_cliente_token");
    localStorage.removeItem("closetnovo_parceiro_token");
    if(forceReload){
      window.location.reload();
    }
  }

  return (
    <Router>
      <MainContext.Provider value={{ loaded, cart, user, setUser, logout }}>
        <Header />
        <ToastContainer style={{ zIndex: 99999999 }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/register" element={<Register />} />
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