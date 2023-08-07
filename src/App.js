import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Note the addition of 'Routes'
import Registration from './form/Registration'; // Your existing component
import SubmittedData from './form/SubmittedData'; // The new component you created
import './App.css'
const App = () => {
  return (
    <Router>
     
      <Routes> {/* Use the <Routes> component */}
        <Route path="/" element={<Registration />} />
        <Route path="/submitted-data" element={<SubmittedData />} />
      </Routes>
    </Router>
  );
};

export default App;
