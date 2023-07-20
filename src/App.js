import React from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Order from "./pages/customer/Order";
import Checkout from "./pages/customer/Checkout";
import Bukti from "./pages/customer/Bukti";
import ListOrder from "./pages/admin/ListOrder";
import VerifikasiPembayaran from "./pages/admin/VerifikasiPembayaran";
import CetakBukti from "./pages/admin/CetakBukti";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        {/* customer */}
        <Route path="/order/:id" element={<Order/>}></Route>
        <Route path="/checkout/:id" element={<Checkout/>}></Route>
        <Route path="/bukti/:id" element={<Bukti/>}></Route>

        {/* admin */}
        <Route path="/listorder/" element={<ListOrder/>}></Route>
        <Route path="/verifikasipembayaran/:id" element={<VerifikasiPembayaran/>}></Route>
        <Route path="/cetakbukti/:id" element={<CetakBukti/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
