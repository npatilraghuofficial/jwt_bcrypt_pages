import React, { useState } from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    // Perform register logic here using the captured input values
    const newUser = {
        name,
        phoneNumber,
        password
      };

    console.log('name:', name);
    console.log('Phone Number:', phoneNumber);
    console.log('Password:', password);
    alert("server routing to add user");

    const data = fetch('http://localhost:9000/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
          console.log("server routed to add user");
          return response.json();
        }
        throw new Error('Registration failed');
      })
      .then((data) => {
        console.log(data);
        // Handle success response here
      })
      .catch((error) => {
        console.error(error);
        // Handle error response here
      });




  };

  return (
    <>
      <center>
        <h2>Application To demonstrate JWT Authentication</h2>
      </center>
      <h6 align="right">By Raghavendra N Patil</h6>

      <h1>Register Page</h1>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBInput
          wrapperClass='mb-4'
          label='User Name'
          id='form1'
          type='text'
          value={name}
          onChange={handleUserNameChange}
        />
        <MDBInput
          wrapperClass='mb-4'
          label='Phone Number'
          id='form2'
          type='number'
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <MDBInput
          wrapperClass='mb-4'
          label='Password'
          id='form3'
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />

        <MDBBtn className="mb-4" onClick={handleRegister}>
          Register
        </MDBBtn>
        <p>
          Already a member? <NavLink to="/">Login here</NavLink>
        </p>
      </MDBContainer>
    </>
  );
}

export default Register;
