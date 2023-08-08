import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Note the addition of 'Routes'
import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, TextField } from '@mui/material';

const SubmittedData = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch('http://localhost:5001/api/get-submitted-data')
      .then(response => response.json())
      .then(data => {
        setSubmittedData(data);
      })
      .catch(error => console.error('Error fetching submitted data:', error));
  }, []);

  useEffect(() => {
    const searchQuery = searchText ? `?searchTerm=${encodeURIComponent(searchText)}` : '';

    fetch(`http://localhost:5001/api/search${searchQuery}`)
      .then(response => response.json())
      .then(data => {
        setSubmittedData(data);
      })
      .catch(error => console.error('Error fetching submitted data:', error));
  }, [searchText]);

  const filteredData = submittedData.filter(row => {
    return (
      row.First_Name.toLowerCase().includes(searchText.toLowerCase()) ||
      row.Last_Name.toLowerCase().includes(searchText.toLowerCase()) ||
      row.Email.toLowerCase().includes(searchText.toLowerCase()) ||
      row.Phone_Number.toLowerCase().includes(searchText.toLowerCase()) ||
      row.Gender.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div className="submitted-data-container">
      <h2>View Board</h2>
      <div style={{ marginBottom: '10px' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </div>
      <div className="table-scroll-container">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className='header'>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Gender</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submittedData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.First_Name}</TableCell>
                  <TableCell>{row.Last_Name}</TableCell>
                  <TableCell>{row.Email}</TableCell>
                  <TableCell>{row.Phone_Number}</TableCell>
                  <TableCell>{row.Gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className='link'>
          <Link to="/">Get back to Registration page</Link>
        </div>
      </div>

    </div>
  );
};

export default SubmittedData;
