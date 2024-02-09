// components/Settings.js

"use client"
import { useState } from 'react';

const Settings = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const updatePhone = async () => {
    // Phone update logic here
    console.log('Update Phone button clicked');
  };

  const updatePassword = async () => {
    // Password update logic here
    console.log('Update Password button clicked');
  };

  const updateEmail = async () => {
    // Email update logic here
    console.log('Update Email button clicked');
  };

  return (
    <div>
      <h1>User Settings</h1>
      <form>
        <div>
          <label>New Phone Number:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button type="button" onClick={updatePhone}>Update Phone</button>
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
          <button type="button" onClick={updatePassword}>Update Password</button>
        </div>
        <div>
          <label>New Email Address:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="button" onClick={updateEmail}>Update Email</button>
        </div>
      </form>
    </div>
  );
};


export default Settings;
