"use client";
import React, { useState, useEffect } from 'react';
import NavbarComponent from '@/components/Navbar';
import axios from 'axios';
import './Dashboard.css';

interface FormData {
  id: number;
  submission_period: string;
  name: string;
  surname: string;
  email: string;
  title: string;
  faculty: string;
  department: string;
  work_name: string;
  basic_field: string;
  scientific_field: string;
  persons: number;
  academic_activity_type: string;
  activity: string;
  doi_number: string;
  file_path: string;
  score: string;
  status: string;
  comment: string;
  comment_by: string;
  comment_date: string;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const [formData, setFormData] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + '/table');
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
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
                <th>Teslim Süresi</th>
                <th>İsim</th>
                <th>Soyisim</th>
                <th>Email</th>
                <th>Başlık</th>
                <th>Fakülte </th>
                <th>Bölüm</th>
                <th>Eser Adı</th>
                <th>Temel Alan</th>
                <th>Bilimsel Alan</th>
                <th>Kişi Sayısı</th>
                <th>Akademik Faliyet Türü</th>
                <th>Aktivite</th>
                <th>DOI Numarası</th>
                <th>Dosya</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {formData.map(data => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.submission_period}</td>
                  <td>{data.name}</td>
                  <td>{data.surname}</td>
                  <td>{data.email}</td>
                  <td>{data.title}</td>
                  <td>{data.faculty}</td>
                  <td>{data.department}</td>
                  <td>{data.work_name}</td>
                  <td>{data.basic_field}</td>
                  <td>{data.scientific_field}</td>
                  <td>{data.persons}</td>
                  <td>{data.academic_activity_type}</td>
                  <td>{data.activity}</td>
                  <td>{data.doi_number}</td>
                  <td>{data.file_path}</td>
                  <td>{data.score}</td>
                  <td>{data.status}</td>
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
