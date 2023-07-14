import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { baseUrl } from '../../config'

const VerifikasiPembayaran = () => {
    const { id } = useParams()
    const [customer, setCustomer] = useState([])
    const [listCustomer, setListCustomer] = useState([])
    
    const navigate = useNavigate()

    const [jenisPembayaran, setJenisPembayaran] = useState('Cash')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/customerVerifikasiPembayaran/${id}`)
            setCustomer(response.data.data.pembeli)
            setListCustomer(response.data.data.listItem)
        } catch (error) {
            console.log(error)
        }
    }

    const handlerconfirmSelesai = async (e) => {
        e.preventDefault()
        try {
            await axios.patch(`${baseUrl}/confirmSelesai/${id}`,{
                jenisPembayaran: jenisPembayaran
            })
            navigate('/listorder')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <h2 className='text-center mt-2'>Detail {customer.nomorMeja}</h2>
                <hr />
                <div className="card-body">
                    <div className="row">
                        <div className="col-12">
                            <h3>Nama : {customer.namaPembeli}</h3>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <h2 className='mb-3 text-center'>Pesanan</h2>
                        {listCustomer.map((item, index) => (
                            <div className="row" key={index}>
                                <div className="col-6">
                                    <h3>{item.nama}</h3>
                                </div>
                                <div className="col-6">
                                    <h3>Rp{item.harga}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-12">
                            <h3 className='text-end'>Total : Rp{new Intl.NumberFormat('en-US').format(customer.totalBayar)}</h3>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <h2 className='mb-3 text-center'>Pilih Jenis Pembayaran</h2>
                        <form onSubmit={handlerconfirmSelesai}>
                            <div className="mb-3">
                                {/* <label className="form-label"><h2></h2></label> */}
                                <select className='form-control' value={jenisPembayaran} onChange={(e) => setJenisPembayaran(e.target.value)}>
                                    <option value="Cash">Cash</option>
                                    <option value="GoPay QRIS">Qris</option>
                                </select>
                            </div>
                            <button type='submit' className='btn btn-success form-control'>Selesai</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifikasiPembayaran