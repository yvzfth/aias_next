"use client"
import React, { useState } from 'react';
import axios from 'axios';
import NavbarComponent from '@/components/Navbar';
import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';
const Page = () => {
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        email: ''
    });

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const response = await axios.put('/api/users', formData);
            console.log(response.data); // Başarılı bir şekilde güncellendiğinde yapılacak işlem.
        } catch (error) {
            console.error(error); // Hata durumunda yapılacak işlem.
        }
    };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <NavbarComponent />
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <Image
        className='mx-auto p-4'
        width={150}
        height={66}
        alt='logo'
        src={'/logo-kucuk.png'}
      />
                    
                
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <FaUserCircle className="text-4xl text-gray-500 mr-1" /> {/* Avatar ikonu */}
                    Kullanıcı Ayarları
                </h2>
                <div className="mb-4">
                    <div className="flex flex-col">
                        <label htmlFor="phone" className="text-gray-700 mb-1">Telefon Numarası:</label>
                        <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="p-2 border rounded-md" />
                        <button type="button" onClick={(e) => handleSubmit(e)} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Telefonu Güncelle</button>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700 mb-1">Şifre:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="p-2 border rounded-md" />
                        <button type="button" onClick={(e) => handleSubmit(e)} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Şifreyi Güncelle</button>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700 mb-1">E-posta Adresi:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="p-2 border rounded-md" />
                        <button type="button" onClick={(e) => handleSubmit(e)} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">E-postayı Güncelle</button>
                    </div>
                </div>
            </div>
            {/* Buraya sayfanın geri kalan kısmını ekleyebilirsiniz */}
        </div>
    );
};

export default Page;
    
