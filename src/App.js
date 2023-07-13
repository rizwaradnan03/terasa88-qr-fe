import React from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Order from "./pages/Order";
import Checkout from "./pages/Checkout";
import Bukti from "./pages/Bukti";
import ListOrder from "./pages/ListOrder";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/order/:id" element={<Order/>}></Route>
        <Route path="/checkout/:id" element={<Checkout/>}></Route>
        <Route path="/bukti/:id" element={<Bukti/>}></Route>
        <Route path="/listorder/" element={<ListOrder/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
