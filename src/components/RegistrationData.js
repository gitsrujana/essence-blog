import React, { useEffect, useState } from 'react';

const RegistrationData = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Retrieve the data from localStorage
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      // Parse the stored JSON string into an object
      setFormData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="data-display-container">
      <h1>Stored Registration Data</h1>
      {formData ? (
        <div className="data-display">
          <p><strong>First Name:</strong> {formData.firstName}</p>
          <p><strong>Middle Name:</strong> {formData.middleName}</p>
          <p><strong>Last Name:</strong> {formData.lastName}</p>
          <p><strong>Contact Number:</strong> {formData.contactNumber}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          {formData.photo && (
            <div>
              <strong>Uploaded Photo:</strong>
              <img src={formData.photo} alt="Uploaded" style={{ width: '100px', height: '100px' }} />
            </div>
          )}
          {formData.aadhaar && (
            <div>
              <strong>Uploaded Aadhaar:</strong>
              <img src={formData.photo} alt="Uploaded Aadhaar" style={{ width: '100px', height: '100px' }} />
            </div>
          )}
        </div>
      ) : (
        <p>No data found!</p>
      )}
    </div>
  );
};

export default RegistrationData;
