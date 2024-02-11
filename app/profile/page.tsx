"use client"
import React, { useState } from 'react';
import axios from 'axios';

const page = () => {
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        email: ''
    });

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
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
            <h2>Kullanıcı Ayarları</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Telefon Numarası:</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div>
                    <label>Şifre:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div>
                    <label>E-posta Adresi:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <button type="submit">Güncelle</button>
            </form>
        </div>
    );
};

export default page;
