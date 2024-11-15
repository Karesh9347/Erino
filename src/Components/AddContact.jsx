import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import Nav from './Nav';
import axios from 'axios';

const AddContact = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/add-contact", formValues);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setFormValues({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
      });
      alert("contact saved")
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "An error occurred");
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <Nav />
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
          Add Contact
        </Typography>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <TextField
          label="First Name"
          name="firstName"
          value={formValues.firstName}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formValues.lastName}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          fullWidth
          required
          type="email"
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formValues.phoneNumber}
          onChange={handleInputChange}
          fullWidth
          required
          type="tel"
        />
        <TextField
          label="Company"
          name="company"
          value={formValues.company}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Job Title"
          name="jobTitle"
          value={formValues.jobTitle}
          onChange={handleInputChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Contact
        </Button>
      </Box>
    </div>
  );
};

export default AddContact;
