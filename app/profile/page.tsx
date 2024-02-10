"Use Client "
import React, { useState } from 'react';
import axios from 'axios';
import { useClient } from 'next/client';

const Settings = () => {
  useClient(); // Client Component olduğunu belirtmek için kullanılıyor

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.put('/api/customer/update', {  
        phone,
        password,
        email,
      });
      setSuccess('Update successful');
    } catch (error) {
      setError('An error occurred while updating');
      console.error('Error updating customer information:', error); 
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Settings;
