'use client';
import React, { FormEventHandler, useState } from 'react';
import axios from 'axios';
import { Card, Button, Input } from '@nextui-org/react';
import NavbarComponent from '@/components/Navbar';

const HomePage = () => {
  const [formData, setFormData] = useState({
    new_academic_activity_type: '',
    new_activity_id: '',
    new_description: '',
    new_point: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://your-laravel-backend.com/api/add_activity',
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <NavbarComponent />
      <div className='container mx-auto p-8'>
        <Card className='p-6'>
          <h1 className='text-3xl font-bold mb-4'>Akademik Faaliyetler</h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <Input
                type='text'
                label='Yeni Akademik Faaliyet Türü'
                name='new_academic_activity_type'
                value={formData.new_academic_activity_type}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-4'>
              <Input
                type='text'
                label='Yeni Faaliyet Id'
                name='new_activity_id'
                value={formData.new_activity_id}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-4'>
              <Input
                type='textarea'
                label='Yeni Faaaliyet Adı'
                name='new_description'
                value={formData.new_description}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-4'>
              <Input
                type='text'
                label='Yeni Faaliyet Değeri'
                name='new_point'
                value={formData.new_point}
                onChange={handleChange}
                required
              />
            </div>
            <Button type='submit' variant='solid' color='primary'>
              Faaliyet Ekle
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
