import React, { useEffect, useState } from 'react';
import Head from 'next/head';

function KSettings(): React.JSX.Element {
  const [katsayilar, setKatsayilar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/katsayilar');
        if (!response.ok) {
          throw new Error('Katsayılar getirilemedi');
        }
        const data = await response.json();
        setKatsayilar(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (id: any, value: string) => {
    try {
      const response = await fetch(`/api/katsayi/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, value }),
      });
      if (!response.ok) {
        throw new Error('Katsayı güncellenemedi');
      }
      // Güncelleme işleminden sonra sayfayı yeniden yükle
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Katsayı Ayarları</title>
      </Head>
      <h1>Katsayı Ayarları</h1>
      <ul>
        {katsayilar.map((katsayi: any) => (
          <li key={katsayi.id}>
            {katsayi.value}{' '}
            <input
              type="text"
              defaultValue={katsayi.value}
              onChange={(e) => handleUpdate(katsayi.id, e.target.value)}
            />
            <button onClick={() => handleUpdate(katsayi.id, katsayi.value)}>
              Güncelle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KSettings;
