import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../config';
import { Link, useNavigate } from 'react-router-dom';

const ListOrder = () => {
    const [listKonfirmasi, setListKonfirmasi] = useState([]);
    const [listPending, setListPending] = useState([]);

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/listOrder`);
            setListKonfirmasi(response.data.data.konfirmasi);
            setListPending(response.data.data.pending);
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
            fetchData()
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-3">
            <div className="card mb-3">
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
                            {listKonfirmasi.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.meja}</td>
                                    <td>Rp{new Intl.NumberFormat('en-US').format(item.totalBayar)}</td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => handlerUpdateKonfirmasi(item.id)}>Konfirmasi</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card">
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
                            {listPending.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.meja}</td>
                                    <td>Rp{new Intl.NumberFormat('en-US').format(item.totalBayar)}</td>
                                    <td>
                                        <Link className='btn btn-success' to={`/verifikasipembayaran/${item.id}`}>Detail</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ListOrder;