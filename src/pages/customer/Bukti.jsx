import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../config';

const Bukti = () => {
  const { id } = useParams();
  const [pembeli, setPembeli] = useState([]);
  const [listPesanan, setListPesanan] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Menambahkan state untuk mengontrol rendering

  const handlerCalculate = () => {
    let total = 0;
    listPesanan.forEach((item) => {
      const harga = parseInt(item.harga.replace(',', ''));
      total += harga * item.jumlah;
    })
    return total
  };

  const getData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getBukti/${id}`);
      setPembeli(response.data.data.pembeli);
      setListPesanan(response.data.data.listItem);
      console.log(response.data.data.listItem)
      setIsDataLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    getData();
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 3000); // Refresh setiap 2 menit (120000 milidetik)
    return () => {
      clearInterval(interval);
    };
  }, []);



  // Menampilkan loading atau placeholder saat data sedang dimuat
  if (!isDataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Bukti Pesanan :</h2>
          <hr />
          <div className="row mb-2">
            <div className="col-6">
              <h4>Nama : {pembeli.namaPembeli}</h4>
            </div>
            <div className="col-6">
              <h4>Meja : {pembeli.nomorMeja}</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <>
                <h4>
                  Status :{' '}
                  {pembeli.isDone === 0 ? (
                    <button className="text-danger border border-2 border-danger rounded bg-light">
                      Menunggu Konfirmasi
                    </button>
                  ) : pembeli.isDone === 1 ? (
                    <button className="text-warning border border-2 border-warning rounded bg-light">
                      Pesanan Di Proses
                    </button>
                  ) : pembeli.isDone === 2 ? (
                    <button className="text-primary border border-2 border-primary rounded bg-light">
                      Pesanan Sudah Sampai
                    </button>
                  ) : pembeli.isDone === 3 ? (
                    <button className="text-success border border-2 border-success rounded bg-light">
                      Pesanan Selesai
                    </button>
                  ) : null}
                </h4>
              </>
            </div>
          </div>
          <hr />
          {/* <h2>Pesanan : </h2> */}
          {listPesanan.map((item, index) => (
            <div className="row" key={index}>
              <div className="col-5">
                <h4>{item.nama}</h4>
              </div>
              <div className="col-3">
                <h4>{item.jumlah} Pcs</h4>
              </div>
              <div className="col-4">
                <h5>
                  Rp
                  {new Intl.NumberFormat('en-US').format(
                    item.jumlah * parseInt(item.harga.replace(',', ''))
                  )}
                </h5>
              </div>
            </div>
          ))}
          <hr />
          <div className="row">
            <div className="col-12">
              <h2 className="text-end">
                Total: Rp{new Intl.NumberFormat('en-US').format(handlerCalculate())}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bukti;
