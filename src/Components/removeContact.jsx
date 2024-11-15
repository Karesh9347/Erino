import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Nav from './Nav';
import axios from 'axios';

const RemoveContact = () => {
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const response=await axios.delete(`http://localhost:5000/remove-contact/${email}`)
        alert(response.data.message)
    }catch(err){
        alert(err.response.data.message)
    }
   
  };

  return (
    <div>
        <Nav/>
  
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h5" textAlign="center">
        Remove Contact
      </Typography>
      <TextField
        label="Email"
        name="email"
        value={email}
        onChange={handleInputChange}
        fullWidth
        required
        type="email"
      />
      <Button type="submit" variant="contained" color="secondary" fullWidth>
        Remove Contact
      </Button>
    </Box>
    </div>
  );
};

export default RemoveContact;
