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

        console.log('Phone Number:', phoneNumber);
        console.log('Password:', password);

        alert("server routing to login user");
        const data = fetch('http://localhost:9000/login-user', {
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
              console.log(data);
              sessionStorage.setItem("phoneNuber",phoneNumber);
            })
            .catch((error) => {
              console.error(error);
              // Handle error response here
            });


      };
    
  return (<>
  <center><h2>Application To demonstrate JWT Authentication</h2> </center>
  <h1>Login Page</h1>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

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


      

      <MDBBtn className="mb-4" onClick={handleLogin}>login</MDBBtn>
      <p>Not a member? <a href="#!"><NavLink to="/register">Register here</NavLink></a></p>
     



    </MDBContainer>
    </>
  );
}

export default Login;