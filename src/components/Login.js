import React from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBCardSubTitle
}
from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';





function Login() {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
      };
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };


    const handleLogin = () => {


        const newUser = {
            phoneNumber,
            password
          };

        

        alert("server routing to login user");
        const data = fetch('https://jwt-bcrypt-authetication-deployment.onrender.com/login-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          })
            .then((response) => {
              if (response.ok) {
                console.log("server routed to login user");
                return response.json();
              }
              throw new Error('login failed');
            })
            .then((data) => {
              sessionStorage.setItem("phoneNumber",phoneNumber);
              sessionStorage.setItem("token",data.token);
              alert("User logged in successfully....");
              window.location.href = "/orders";

            })
            .catch((error) => {
              console.error(error);
            });


      };
    
  return (<>
  <center><h2>Application To demonstrate JWT Authentication</h2> </center>
  <h1>Login Page</h1>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

    <MDBInput
          wrapperClass='mb-4'
          label=' Enter Phone Number'
          id='form2'
          type='number'
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <MDBInput
          wrapperClass='mb-4'
          label='Enter Password'
          id='form3'
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />


      

      <Button variant="outline-primary" onClick={handleLogin}>login</Button>{' '}
      <a><NavLink to="/register">Register here</NavLink></a>{' '}



     



    </MDBContainer>
    </>
  );
}

export default Login;