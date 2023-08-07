import React, { useState } from 'react';
import { Alert, AlertTitle, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Registration = () => {
 

  const [formData, setFormData] = useState({
    First_Name: '',
    Last_Name: '',
    Email: '',
    Phone_Number: '',
    Password: '',
    Confirm_Password: '',
    Gen: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();

    // Password validation
    if (formData.Password !== formData.Confirm_Password) {
      setPasswordError('Passwords do not match.');
      return;
    }

    // Clear password error
    setPasswordError('');

    const API_URL = 'http://localhost:5001/api/register';

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setSuccessMessage('Registration successful!! Go to ');
          setErrorMessage('');
         
        } else {
          setErrorMessage('Error during registration. Please try again.');
          setSuccessMessage('');
        }

        // Reset form data if registration is successful
        if (data.message) {
          setFormData({
            First_Name: '',
            Last_Name: '',
            Email: '',
            Phone_Number: '',
            Password: '',
            Confirm_Password: '',
            Gen: '',
          });
        } else {
          // Handling registration error
          console.error('Error during registration:', data.error);
          
        }
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        setErrorMessage('Error during registration. Please try again.');
        setSuccessMessage('');
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div id="registration" className="container">
      <div className="title">Registration</div>
      <div className="content">
      {successMessage && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success" action={<IconButton onClick={() => setSuccessMessage('')}> <CloseIcon /> </IconButton>}>
              <AlertTitle>Success</AlertTitle>
              {successMessage}<Link to="/submitted-data">Database</Link>
            </Alert>
          </Stack>
        )}
        {errorMessage && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error" action={<IconButton onClick={() => setErrorMessage('')}> <CloseIcon /> </IconButton>}>
              <AlertTitle>Error</AlertTitle>
              {errorMessage}
            </Alert>
          </Stack>
        )}
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">First_Name</span>
              <input
                type="text"
                placeholder="Enter your FirstName"
                name="First_Name"
                value={formData.First_Name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Last_name</span>
              <input
                type="text"
                placeholder="Enter your LastName"
                name="Last_Name"
                value={formData.Last_Name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input
                type="email"
                placeholder="Enter your email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Phone_Number</span>
              <input
                type="text"
                placeholder="Enter your number"
                name="Phone_Number"
                value={formData.Phone_Number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Confirm_Password</span>
              <input
                type="password"
                placeholder="Confirm your password"
                name="Confirm_Password"
                value={formData.Confirm_Password}
                onChange={handleChange}
                required
              />
              {passwordError && <p className="error-message" style={{ fontWeight: 'normal', color: 'red', margintop: '5px', textalign: 'right' }}>{passwordError}</p>}

            </div>
          </div>
          <div className="gender-details">

            <div className="gender-details">
              <label htmlFor="dot-1" className="category-label">
                <input
                  type="radio"
                  name="Gen"
                  id="dot-1"
                  value="Male"
                  onChange={handleChange}
                  checked={formData.Gen === 'Male'}
                />

                <span className="gender-title">Male</span>
              </label>

              <label htmlFor="dot-2" className="category-label">
                <input
                  type="radio"
                  name="Gen"
                  id="dot-2"
                  value="Female"
                  onChange={handleChange}
                  checked={formData.Gen === 'Female'}
                />

                <span className="gender-title">Female</span>
              </label>

              <label htmlFor="dot-3" className="category-label">
                <input
                  type="radio"
                  name="Gen"
                  id="dot-3"
                  value="Prefer not to say"
                  onChange={handleChange}
                  checked={formData.Gen === 'Prefer not to say'}
                />

                <span className="gender-title">Prefer not to say</span>
              </label>
            </div>


          </div>


          <div className="button">
            <input type="submit" name="save" value="Register" />
          </div>
        </form>
      </div>
    </div>
    
  );
};

export default Registration;
