'use client';
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
  Tooltip,
} from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import { FaPerson } from 'react-icons/fa6';
// import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState('login');
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
  });

  const handleSubmit = async (e: any) => {
    if (selected !== 'login') {
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + '/user/register',
          formData
        );
        console.log(response.data); // Handle success response
      } catch (error) {
        console.error(error); // Handle error
      }
    } else {
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + '/user/login',
          {
            phone: formData.phone,
            password: formData.password,
          }
        );
        const { authorisation, user } = response.data;
        if (authorisation?.token) router.push('/applications');
      } catch (error) {
        console.error(error); // Handle login error
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <main className='p-4 bg-white'>
      <div className='h-screen flex flex-col items-center justify-center'>
        <Card className='max-w-full w-[340px] h-fit'>
          <div className='text-center mx-auto w-fit mt-4'>
            <img src='/logo-kucuk.png' width='140' />
          </div>
          <div className='text-center mt-4'>
            <h4 className='font-semibold opacity-75'>
              Akademik Teşvik Sistemi
            </h4>
            <h6 className='fw-semibold opacity-75'>Üye Kayıt Paneli</h6>
          </div>
          <CardBody className='overflow-hidden '>
            <Tabs
              fullWidth
              size='md'
              aria-label='Tabs form'
              selectedKey={selected}
              onSelectionChange={(e) => setSelected(e.toString())}
            >
              <Tab key='login' title='Login'>
                <form
                  action='login.php'
                  method='post'
                  id='login'
                  className='flex flex-col gap-4'
                >
                  <Input
                    required
                    label='Telefon'
                    type='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <Input
                    required
                    label='Şifre'
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <p className='text-center text-small'>
                    Need to create an account?{' '}
                    <Link size='sm' onPress={() => setSelected('sign-up')}>
                      Sign up
                    </Link>
                  </p>
                  <div className='flex gap-2 justify-end'>
                    <Button fullWidth color='primary' onPress={handleSubmit}>
                      Login
                    </Button>
                  </div>
                </form>
              </Tab>
              <Tab key='sign-up' title='Sign up'>
                <form className='flex flex-col gap-4 '>
                  <Input
                    label='İsim'
                    name='firstname'
                    required
                    value={formData.firstname}
                    onChange={handleChange}
                  />

                  <Input
                    label='Soyisim'
                    name='lastname'
                    required
                    value={formData.lastname}
                    onChange={handleChange}
                  />

                  <Input
                    label='Email'
                    type='email'
                    name='email'
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <Input
                    label='Telefon'
                    type='tel'
                    name='phone'
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <Input
                    label='Şifre'
                    type='password'
                    name='password'
                    required
                    pattern='.*[^\d].*'
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <p className='text-center text-small'>
                    Already have an account?{' '}
                    <Link size='sm' onPress={() => setSelected('login')}>
                      Login
                    </Link>
                  </p>

                  <Button fullWidth color='primary' onPress={handleSubmit}>
                    Sign up
                  </Button>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        <span className='text-center text-xs text-gray-700 opacity-8 mt-4'>
          Copyright © İstanbul Nisantasi Universitesi {new Date().getFullYear()}
        </span>
      </div>
    </main>
  );
}
