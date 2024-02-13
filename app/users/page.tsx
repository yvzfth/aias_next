'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import NavbarComponent from '@/components/Navbar';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users`
      );
      setUsers(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <NavbarComponent />

      <div className='container mx-auto p-8'>
        <h1 className='text-3xl font-bold mb-4'>Kullanıcılar</h1>
        <div className='p-datatable'>
          <DataTable
            value={users}
            paginator
            rows={30}
            // rowsPerPageOptions={[10, 25, 50]}
          >
            <Column field='id' header='ID' sortable></Column>
            <Column field='firstname' header='First Name' sortable></Column>
            <Column field='lastname' header='Last Name' sortable></Column>
            <Column field='email' header='Email' sortable></Column>
            <Column field='phone' header='Phone' sortable></Column>
            <Column field='role' header='Role' sortable></Column>
            <Column field='status' header='Status' sortable></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
