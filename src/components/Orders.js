import React, { useState } from 'react';


import jwt_decode from 'jwt-decode';
import { NavLink } from 'react-router-dom';




function ProductForm() {
  const [productName, setProductName] = useState('');
  const [subTotal, setSubTotal] = useState('');

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleSubTotalChange = (e) => {
    setSubTotal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const phoneNumber = sessionStorage.getItem("phoneNumber");
    const token = sessionStorage.getItem("token");
  const decodedToken = jwt_decode(token);

// Access the user ID from the decoded token
const userId = decodedToken.userId;
const userId_param = sessionStorage.setItem("userId_param",userId);




    const newProduct = {
      userId,
      phoneNumber,
      subTotal
    };

   
   
    fetch('https://jwt-bcrypt-authetication-deployment.onrender.com/add-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,

      },
      body: JSON.stringify(newProduct),
    })

      .then((response) => {
        if (response.ok) {
          console.log("server routed to add order");
          return response.json();
        }
        throw new Error('add order failed');
      }
      )
      .then((data) => {
        alert("order placed successfully");
        window.location.href = "/view-order";
      }
      )
      .catch((error) => {
        console.error(error);
      }
      );

  };

  return (
    <form onSubmit={handleSubmit}>
      <NavLink to="/view-order"><p>view My orders(To view orders please order atleast once )</p></NavLink>
      <div>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={handleProductNameChange}
        />
      </div>
      <div>
        <label htmlFor="subTotal">Product Price:</label>
        <input
          type="number"
          id="subTotal"
          value={subTotal}
          onChange={handleSubTotalChange}
        />
      </div>
      <button type="submit">order-now</button>
    </form>
  );
}

export default ProductForm;
