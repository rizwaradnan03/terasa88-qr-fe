import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { baseUrl } from '../config';

const Checkout = () => {
    const { id } = useParams();
    const location = useLocation();
    const cart = location.state.data;
    const [datas, setData] = useState([]);
    const [totalHarga, setTotalHarga] = useState(0);
    
    const [showButton, setShowButton] = useState(true);
    const navigate = useNavigate();

    const [namaPembeli, setNamaPembeli] = useState('');
    const [catatanPembeli, setCatatanPembeli] = useState('');
    const [jenisPembayaran, setJenisPembayaran] = useState('bayar_langsung');
    console.log(totalHarga);

    useEffect(() => {
        getData();
        handlerCalculate();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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

    const handlerCalculate = () => {
        let total = 0;
        cart.forEach(item => {
            const harga = parseInt(item.harga.replace(',', ''));
            total += harga * item.jumlah;
        });
        setTotalHarga(total);
    };

    const getData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/getMeja/${id}`);
            setData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handlerAjukanPesanan = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/ajukanPesanan/`, {
                namaPembeli: namaPembeli,
                catatanPembeli: catatanPembeli,
                jenisPembayaran: jenisPembayaran,
                mejaId: datas.id,
                totalBayar: totalHarga.toString(),
                pesanan: cart,
            });

            Swal.fire({
                title: 'Siip',
                text: 'Makanan Otw Di Proses Nih',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {
                navigate(`/bukti/${response.data.data.id}`)
            })
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="container mt-3">
            <div className="card mb-4">
                <div className="card-body">
                    <h2 className='mb-5'>Pesanan: </h2>
                    <>
                        {cart.map((item, index) => (
                            <div className="item" key={index}>
                                <div className="row">
                                    <div className="col-5">
                                        <h4>{item.nama}</h4>
                                    </div>
                                    <div className="col-3">
                                        <h5>{item.jumlah} Pcs</h5>
                                    </div>
                                    <div className="col-4">
                                        <h5>Rp{new Intl.NumberFormat('en-US').format(item.jumlah * parseInt(item.harga.replace(',', '')))}</h5>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </>
                    <div className="row">
                        <div className="col-12">
                            <h2 className='text-end'>Total: Rp{new Intl.NumberFormat('en-US').format(totalHarga)}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card" style={{ padding: '10px' }}>
                <form onSubmit={handlerAjukanPesanan}>
                    <div className="mb-3">
                        <label className="form-label"><h2>Nama Pembeli</h2></label>
                        <input type="text" className="form-control" placeholder='Masukkan Nama' value={namaPembeli} onChange={(e) => setNamaPembeli(e.target.value)} required />
                        <div className="form-text" style={{ color: 'red' }}>*Nama Wajib Diisi</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><h2>Catatan Untuk Makanan</h2></label>
                        <input type="text" className="form-control" placeholder='Masukkan Catatan' value={catatanPembeli} onChange={(e) => setCatatanPembeli(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><h2>Jenis Pembayaran</h2></label>
                        <select className='form-control' defaultValue={jenisPembayaran} onChange={(e) => setJenisPembayaran(e.target.value)} required>
                            <option value="#" disabled selected>--Pilih Jenis Pembayaran--</option>
                            <option value="bayar_langsung">Bayar Langsung</option>
                            <option value="qris">Qris</option>
                        </select>
                        <div className="form-text" style={{ color: 'red' }}>*Jenis Pembayaran Wajib Dipilih</div>
                    </div>
                    <button type='submit' className='btn btn-success form-control fixed-bottom py-1'>Ajukan Pesanan</button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
