
"use client"
import React, { useState, useEffect } from 'react';
import NavbarComponent from '@/components/Navbar';
import axios from 'axios';
import './Dashboard.css';

interface FormData {
  id: number;
  temel_alan: string;
  bilimsel_alan: string;
  akademik_faaliyet_turu: string;
  faaliyet: string;
  eser_adi: string;
  doi_numarasi: string;
  kisi: string;
  basvuru_donemi: string;
  tesvik_puani: number;
  basvuru_tarihi: string;
  dosyalar: string;
  onay_durumu: string;
}

const Dashboard = () => {
  const [formData, setFormData] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true); // Başlangıçta veriler yükleniyor olarak ayarlanır

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + '/table');
        setFormData(response.data);
        setLoading(false); // Veriler başarıyla alındıktan sonra yükleme durumu kapatılır
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Hata durumunda da yükleme durumu kapatılır 
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <NavbarComponent />
      <div className="container mt-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table m-8">
            <thead>
              <tr>
                <th>ID</th>
                <th>Temel Alan</th>
                <th>Bilimsel Alan</th>
                <th>Akademik Faaliyet Türü</th>
                <th>Faaliyet</th>
                <th>Eser Adi</th>
                <th>Doi Numarası</th>
                <th>Kişi</th>
                <th>Başvuru Dönemi</th>
                <th>Teşvik Puanı</th>
                <th>Başvuru Tarihi</th>
                <th>Dosyalar</th>
                <th>Onay Durumu</th>
              </tr>
            </thead>
            <tbody>
              {formData.map(data => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.temel_alan}</td>
                  <td>{data.bilimsel_alan}</td>
                  <td>{data.akademik_faaliyet_turu}</td>
                  <td>{data.faaliyet}</td>
                  <td>{data.eser_adi}</td>
                  <td>{data.doi_numarasi}</td>
                  <td>{data.kisi}</td>
                  <td>{data.basvuru_donemi}</td>
                  <td>{data.tesvik_puani}</td>
                  <td>{new Date(data.basvuru_tarihi).toLocaleDateString()}</td>
                  <td>{data.dosyalar}</td>
                  <td>{data.onay_durumu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
