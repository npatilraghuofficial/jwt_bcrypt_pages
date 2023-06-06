import React, { useState } from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

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
        alert("User added successfully....Now please login");
        // Handle success response here
       window.location.href = "/";

      })
      .catch((error) => {
        console.error(error);
        alert("error...");
        

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
          label=' Enter User Name'
          id='form1'
          type='text'
          value={name}
          onChange={handleUserNameChange}
        />
        <MDBInput
          wrapperClass='mb-4'
          label='Enter Phone Number'
          id='form2'
          type='number'
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <MDBInput
          wrapperClass='mb-4'
          label=' Enter Password'
          id='form3'
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />

       
        <Button variant="outline-primary" onClick={handleRegister}>Register</Button>{' '}

        <p>
          Already a member? <NavLink to="/">Login here</NavLink>
        </p>
      </MDBContainer>
    </>
  );
}


export default Register;