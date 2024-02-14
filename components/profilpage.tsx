"use client"

import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import NavbarComponent from '@/components/Navbar';
import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';
import { Input, Button } from '@nextui-org/react';
import { Card } from '@nextui-org/react';
const Page = () => {
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        email: ''
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
          <div className='container mx-auto p-8'>
            
            <Card className='p-6'>
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
      
              <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
                <div>
                  <label htmlFor="phone" className="text-gray-700 mb-1">Telefon Numarası:</label>
                  <Input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                  <Button type="submit" className="mt-2" variant="solid" color="primary">Telefonu Güncelle</Button>
                </div>
      
                <div>
                  <label htmlFor="password" className="text-gray-700 mb-1">Şifre:</label>
                  <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                  <Button type="submit" className="mt-2" variant="solid" color="primary">Şifreyi Güncelle</Button>
                </div>
      
                <div>
                  <label htmlFor="email" className="text-gray-700 mb-1">E-posta Adresi:</label>
                  <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                  <Button type="submit" className="mt-2" variant="solid" color="primary">E-postayı Güncelle</Button>
                </div>
              </form>
            </Card>
          </div>
          {/* Buraya sayfanın geri kalan kısmını ekleyebilirsiniz */}
        </div>
      );
      
};

export default Page;