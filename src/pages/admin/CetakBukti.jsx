import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../../config'

const CetakBukti = () => {
  const [item, setItem] = useState([])
  const [bukti, setBukti] = useState([])
  const { id } = useParams()

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/customerVerifikasiPembayaran/${id}`)
      setItem(response.data.data.pembeli)
      setBukti(response.data.data.listItem)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()

    setTimeout(() => {
      window.print()
    }, 3000)
  }, [])

  return (
    <div className="container text-center" style={{ fontFamily: 'serif' }}>
      <h4 style={{fontSize: '14px'}}>Jalan Pondok Sukmajaya Permai No. <br /> 10A Depok - Jawa Barat</h4>
      <table className='table mt-3'>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Pcs</th>
            <th>Jlh</th>
          </tr>
        </thead>
        <tbody style={{fontSize: '14px'}}>
          {bukti.map((item, index) => (
            <tr key={index + 1}>
              <td>{item.nama}</td>
              <td>{item.jumlah}</td>
              <td>{item.harga}</td>
              <td>{new Intl.NumberFormat('en-US').format(item.jumlah * parseInt(item.harga.replace(',', '')))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h5 className='text-end mr-2 mb-5' style={{fontSize: '16px'}}>Total {new Intl.NumberFormat('en-US').format(item.totalBayar)}</h5>
      <h6>Terima Kasih Atas Kunjungan Anda</h6>
      <h6 style={{fontSize: '14px'}}>Pesan & Antar (WhatsApp) : 0858 8888 3302</h6>
    </div>
  )
}

export default CetakBukti