import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Registrationform.css';
import { useNavigate } from 'react-router-dom';
const RegistrationForm = () => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [aadhaarPreview, setAadhaarPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      contactNumber: '',
      address: '',
      email: '',
      photo: null,
      aadhaar: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      contactNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits')
        .required('Contact Number is required'),
      address: Yup.string().required('Address is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      photo: Yup.mixed().required('A photo is required'),
      aadhaar: Yup.mixed().required('Aadhaar document is required'),
    }),
    onSubmit: (values) => {
      // Create object $ store in localStorage
      const storedData = {
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        contactNumber: values.contactNumber,
        address: values.address,
        email: values.email,
        photo: values.photo.name, 
        aadhaar: values.aadhaar.name, 
      };
     
      localStorage.setItem('formData', JSON.stringify(storedData));
      alert('Data saved in localStorage');
    },
  });

  const handlePhotoUpload = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue('photo', file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleAadhaarUpload = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue('aadhaar', file);
    setAadhaarPreview(URL.createObjectURL(file));
  };
 
   const navigate= useNavigate()
   const onSubmit = ()=>{
   navigate('/Home')
   }
 
 
  return (
    <div className="form-container">
      <h1>Registration Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="error-message">{formik.errors.firstName}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label>Middle Name</label>
          <input
            type="text"
            name="middleName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.middleName}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="error-message">{formik.errors.lastName}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contactNumber}
          />
          {formik.touched.contactNumber && formik.errors.contactNumber ? (
            <div className="error-message">{formik.errors.contactNumber}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="error-message">{formik.errors.address}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label>Upload Photo</label>
          <input type="file" name="photo" onChange={handlePhotoUpload} />
          {formik.touched.photo && formik.errors.photo ? (
            <div className="error-message">{formik.errors.photo}</div>
          ) : null}
          {photoPreview && <img src={photoPreview} alt="Preview" />}
        </div>

        <div className="form-group">
          <label>Upload Aadhaar</label>
          <input type="file" name="aadhaar" onChange={handleAadhaarUpload} />
          {formik.touched.aadhaar && formik.errors.aadhaar ? (
            <div className="error-message">{formik.errors.aadhaar}</div>
          ) : null}
          {aadhaarPreview && <img src={aadhaarPreview} alt="Preview" />}
        </div>

        <button type="submit" className="submit-btn" onClick={onSubmit}>Submit</button>
        
      </form>
    </div>
  );
};

export default RegistrationForm;
