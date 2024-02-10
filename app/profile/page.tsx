"use Client"
import React, { useState } from 'react';
import NavbarComponent from '@/components/Navbar';
import { Container, Typography, TextField, Button, Grid, Card, CardContent, Avatar } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import axios from 'axios';
import { useClient } from 'next/client';

const Settings = () => {
  useClient(); 

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
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
    <>
      <NavbarComponent />
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Customer Settings
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Card>
              <CardContent>
                <Avatar sx={{ m: 'auto', bgcolor: 'secondary.main' }}>
                  <AccountCircle />
                </Avatar>
                <Typography variant="h6" align="center" gutterBottom>
                  Update Information
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Phone"
                    type="tel"
                    fullWidth
                    margin="normal"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error && (
                    <Typography variant="body2" color="error" align="center">
                      {error}
                    </Typography>
                  )}
                  {success && (
                    <Typography variant="body2" color="primary" align="center">
                      {success}
                    </Typography>
                  )}
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Update
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Settings;
