import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material';
import Nav from './Nav';
import axios from 'axios';

const AllContact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("https://erino-backend-1.onrender.com/all-contacts");
        setContacts(response.data);
      } catch (err) {
        console.error('Error fetching contacts:', err);
        alert('Error fetching contacts');
      }
    };

    fetchContacts();
  }, []);

  const deleteAccount = async (email) => {
    try {
      const response = await axios.delete(`http://localhost:5000/remove-contact/${email}`);
      alert(response.data.message);
      setContacts(contacts.filter(contact => contact.email !== email));  // Remove the deleted contact from the state
    } catch (err) {
      console.error('Error deleting contact:', err);
      alert(err.response?.data?.message || 'Error deleting contact');
    }
  };

  const updateAccount = (email) => {
   
    sessionStorage.setItem('emailToUpdate', email);  
    window.location.href = '/update-contact';  
  };

  return (
    <div>
      <Nav />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          All Contacts
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>First Name</b></TableCell>
                <TableCell><b>Last Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Phone Number</b></TableCell>
                <TableCell><b>Company</b></TableCell>
                <TableCell><b>Job Title</b></TableCell>
                <TableCell><b>Delete</b></TableCell>
                <TableCell><b>Update</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact, index) => (
                <TableRow key={index}>
                  <TableCell>{contact.firstName}</TableCell>
                  <TableCell>{contact.lastName}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phoneNumber}</TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell>{contact.jobTitle}</TableCell>
                  <TableCell><Button onClick={() => deleteAccount(contact.email)} style={{backgroundColor:"red",color:"black"}}>Delete</Button></TableCell>
                  <TableCell><Button onClick={() => updateAccount(contact.email)} style={{backgroundColor:"orange",color:"black"}}> Update</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default AllContact;
