import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainContext } from "./helpers/MainContext";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";

function App() {

  const [user, setUser] = useState(false);

  return (
    <Router>
      <MainContext.Provider value={{ user }}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MainContext.Provider>
    </Router>
  );
}

export default App;