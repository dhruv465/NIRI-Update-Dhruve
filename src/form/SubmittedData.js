import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Note the addition of 'Routes'

const SubmittedData = () => {
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/get-submitted-data')
      .then(response => response.json())
      .then(data => {
        setSubmittedData(data);
      })
      .catch(error => console.error('Error fetching submitted data:', error));
  }, []);

  return (
    <div className="submitted-data-container">
      <h2>View Board</h2>
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
