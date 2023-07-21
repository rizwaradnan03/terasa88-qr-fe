import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config";
import { Link, useNavigate } from "react-router-dom";

const ListOrder = () => {
  const [listMenungguKonfirmasi, setListMenungguKonfirmasi] = useState([]);
  const [listMenungguPengiriman, setListMenungguPengiriman] = useState([]);
  const [listMenungguSelesai, setListMenungguSelesai] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/listOrder`);
      setListMenungguKonfirmasi(response.data.data.dataMenungguKonfirmasi);
      setListMenungguPengiriman(response.data.data.dataMenungguPengiriman);
      setListMenungguSelesai(response.data.data.dataMenungguSelesai);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const interval = setInterval(fetchData, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handlerUpdateKonfirmasi = async (id) => {
    try {
      await axios.patch(`${baseUrl}/updateKonfirmasi/${id}`, {});
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handlerUpdatePengiriman = async (id) => {
    try {
      await axios.patch(`${baseUrl}/updatePengiriman/${id}`, {});
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4">
          <div className="card border-3 border-danger">
            <h2 className="text-center">Menunggu Konfirmasi</h2>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Meja</th>
                    <th>Total</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {listMenungguKonfirmasi.map((item, index) => (
                    <tr key={index}>
                      <td>{item.meja}</td>
                      <td>
                        Rp
                        {new Intl.NumberFormat("en-US").format(item.totalBayar)}
                      </td>
                      <td>
                        <Link to={`/detail/${item.id}`} className="btn btn-warning">Detail</Link>
                        <button
                          className="btn btn-success"
                          onClick={() => handlerUpdateKonfirmasi(item.id)}
                        >
                          Konfirmasi
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card border-3 border-warning">
            <h2 className="text-center">Menunggu Pengiriman</h2>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Meja</th>
                    <th>Total</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {listMenungguPengiriman.map((item, index) => (
                    <tr key={index}>
                      <td>{item.meja}</td>
                      <td>
                        Rp
                        {new Intl.NumberFormat("en-US").format(item.totalBayar)}
                      </td>
                      <td>
                        <Link to={`/detail/${item.id}`} className="btn btn-warning">Detail</Link>
                      <button
                          className="btn btn-success"
                          onClick={() => handlerUpdatePengiriman(item.id)}
                        >
                          Konfirmasi
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card border-3 border-success">
            <h2 className="text-center">Menunggu Pembayaran</h2>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Meja</th>
                    <th>Total</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {listMenungguSelesai.map((item, index) => (
                    <tr key={index}>
                      <td>{item.meja}</td>
                      <td>
                        Rp
                        {new Intl.NumberFormat("en-US").format(item.totalBayar)}
                      </td>
                      <td>
                        <Link
                          className="btn btn-success"
                          to={`/verifikasipembayaran/${item.id}`}
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOrder;
