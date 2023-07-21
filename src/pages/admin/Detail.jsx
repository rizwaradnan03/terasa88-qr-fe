import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { baseUrl } from "../../config";
import axios from 'axios'

const Detail = () => {
    const [detail, setDetail] = useState([])
    const [listItem, setListItem] = useState([])

    const { id } = useParams()

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/customerVerifikasiPembayaran/${id}`)
            setDetail(response.data.data.pembeli)
            setListItem(response.data.data.listItem)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body mb-2">
                    <h1 className='text-center'>Detail Pesanan</h1>
                    <hr />
                    {listItem.map((item, index) => (
                        <div className="row" key={(index + 1)}>
                            <div className="col-6">
                                <h4>{item.nama}</h4>
                            </div>
                            <div className="col-6">
                                <h4>{item.jumlah} Pcs</h4>
                            </div>
                        </div>
                    ))}
                </div>
                <Link to={'/listorder'} className='btn btn-secondary'>Kembali</Link>
            </div>
        </div>
    )
}

export default Detail