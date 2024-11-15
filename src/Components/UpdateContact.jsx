import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Nav from './Nav';
import axios from 'axios';

const UpdateContact = () => {
  const mail=sessionStorage.getItem("emailToUpdate")
  
  const [email, setEmail] = useState(mail);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });

  const [isFormEditable, setIsFormEditable] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`https://erino-backend-1.onrender.com/update-helper/${email}`);
      if (response.data) {
        setFormData(response.data);
        setIsFormEditable(true);  
      }
      sessionStorage.setItem("emailToUpdate","")
    } catch (err) {
      console.error("Error fetching contact:", err.response.data.message);
      alert(err.response.data.message);
    }
    setLoading(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://erino-backend-1.onrender.com/update-contact/${formData._id}`, formData);
      alert('Contact updated successfully');
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
      });
      setEmail('');
      setIsFormEditable(false); 
    } catch (err) {
      console.error('Error updating contact:', err);
      alert('Error updating contact details');
    }
  };

 

  return (
    <div>
      <Nav />
      <Box
        component="form"
        onSubmit={isFormEditable ? handleSubmit : handleEmailSubmit}
        sx={{
          maxWidth: 500,
          margin: 'auto',
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5" textAlign="center">
          Update Contact
        </Typography>

        <TextField
          label="Email (Identifier)"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          type="email"
          disabled={isFormEditable}
        />
        {isFormEditable && (
          <>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update Contact
            </Button>
          </>
        )}
        {!isFormEditable && (
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Contact Details'}
          </Button>
        )}
      </Box>
    </div>
  );
};

export default UpdateContact;
