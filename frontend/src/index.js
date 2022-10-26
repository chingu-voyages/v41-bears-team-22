import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/UserAuth/Login";
import { Register } from "./pages/UserAuth/Register";
import { Home } from "./pages/Home";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
