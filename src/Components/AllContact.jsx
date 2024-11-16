import React, { useState, useEffect } from "react";
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
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Nav from "./Nav";
import axios from "axios";

const AllContact = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState("recent");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "https://erino-backend-1.onrender.com/all-contacts"
        );
        setContacts(response.data);
      } catch (err) {
        alert("Error fetching contacts");
      }
    };
    fetchContacts();
  }, []);

  const deleteAccount = async (email) => {
    try {
      const response = await axios.delete(
        `https://erino-backend-1.onrender.com/remove-contact/${email}`
      );
      alert(response.data.message);
      setContacts(contacts.filter((contact) => contact.email !== email));
    } catch (err) {
      alert("Error deleting contact");
    }
  };

  const updateAccount = (email) => {
    sessionStorage.setItem("emailToUpdate", email);
    window.location.href = "/update-contact";
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    let sortedContacts = [...contacts];
    if (event.target.value === "recent") {
      sortedContacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (event.target.value === "firstName") {
      sortedContacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
    }
    setContacts(sortedContacts);
  };

  const displayedContacts = contacts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      <Nav />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          All Contacts
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <FormControl size="small" sx={{ width: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={filter} onChange={handleFilterChange}>
              <MenuItem value="recent">Recent</MenuItem>
              <MenuItem value="firstName">First Name</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
              {displayedContacts.map((contact, index) => (
                <TableRow key={index}>
                  <TableCell>{contact.firstName}</TableCell>
                  <TableCell>{contact.lastName}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phoneNumber}</TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell>{contact.jobTitle}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => deleteAccount(contact.email)}
                      style={{ backgroundColor: "red", color: "black" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => updateAccount(contact.email)}
                      style={{ backgroundColor: "orange", color: "black" }}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={contacts.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Box>
    </div>
  );
};

export default AllContact;
