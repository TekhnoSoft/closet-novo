import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainContext } from "./helpers/MainContext";
import { Home } from "./pages";
import { BottomTabNavigation, Header } from "./components";
import { useState } from "react";
import Utils from "./Utils";

function App() {

  const [pageIndex, setPageIndex] = useState(Number(localStorage.getItem("closetnovo_bottomtab_index") || 1));
  const [pageIndexDesktop, setPageIndexDesktop] = useState(Number(localStorage.getItem("closetnovo_bottomtab_index_desktop")) || 1);

  return (
    <Router>
      <MainContext.Provider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
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