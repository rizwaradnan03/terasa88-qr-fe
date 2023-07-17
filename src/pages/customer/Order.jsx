import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../config";
import Navbar from "../../components/Navbar";

const cardStyle = {
  height: "220px",
};

const Order = () => {
  const { id } = useParams();
  const [menus, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Filter menus based on search term
    const results = menus.filter((menu) =>
      menu.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [menus, searchTerm]);

  const getData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/listMenu`);
      setMenu(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrolled = window.scrollY;

    if (scrolled + windowHeight >= documentHeight) {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  };

  const handleDecrement = (menu) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(
      (item) => item.kode === menu.kode
    );

    if (existingItemIndex !== -1) {
      if (updatedCart[existingItemIndex].jumlah > 1) {
        updatedCart[existingItemIndex].jumlah--;
        setCart(updatedCart);
        const quantityElement = document.getElementById("jumlah_" + menu.kode);
        if (quantityElement) {
          quantityElement.innerText =
            updatedCart[existingItemIndex].jumlah.toString();
        }
      } else {
        updatedCart.splice(existingItemIndex, 1);
        setCart(updatedCart);
        const quantityElement = document.getElementById("jumlah_" + menu.kode);
        if (quantityElement) {
          quantityElement.innerText = "0";
        }
      }
    }

    console.log("Updated Cart:", updatedCart);
  };

  const handleIncrement = (menu) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(
      (item) => item.kode === menu.kode
    );

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].jumlah++;
      setCart(updatedCart);
    } else {
      setCart([...updatedCart, { ...menu, jumlah: 1 }]);
    }

    const quantityElement = document.getElementById("jumlah_" + menu.kode);
    if (quantityElement) {
      const currentValue = parseInt(quantityElement.innerText);
      quantityElement.innerText = (currentValue + 1).toString();
    }

    console.log("Updated Cart:", updatedCart);
  };

  const handlerData = () => {
    navigate(`/checkout/${id}`, { state: { data: cart } });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <input
          type="text"
          placeholder="Cari menu..."
          className="form-control mt-4 mb-4"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="row">
          {searchResults.map((menu, index) => (
            <div className="col-6 col-sm-6 col-lg-6 col-xl-4 mb-4" key={menu.kode}>
              <div className="card border border-2 border-danger" style={cardStyle}>
                <div className="card-body">
                  <h3>{menu.nama}</h3>
                  <hr />
                  <h3>
                    <b>Rp{menu.harga}</b>
                  </h3>
                  <div className="d-flex justify-content-center align-items-center mt-3">
                    <div className="mx-3" onClick={() => handleDecrement(menu)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-dash-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                      </svg>
                    </div>
                    <div className="mx-3">
                      <b
                        style={{ fontSize: "30px" }}
                        id={"jumlah_" + menu.kode}
                      >
                        {cart.find((item) => item.kode === menu.kode)?.jumlah ||
                          0}
                      </b>
                    </div>
                    <div className="mx-3" onClick={() => handleIncrement(menu)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-plus-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showButton && (
          <div className="row fixed-bottom">
            <div className="col-12">
              {cart.length === 0 ? (
                <button
                  className="btn btn-secondary form-control"
                  disabled
                  style={{ height: "50px" }}
                >
                  Checkout Sekarang ({cart.length})
                </button>
              ) : (
                <button
                  className="btn btn-primary form-control"
                  style={{ height: "50px" }}
                  onClick={() => handlerData()}
                >
                  Checkout Sekarang ({cart.length})
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Order;
