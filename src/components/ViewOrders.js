import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Define the query parameters
    const params = {
      // Add your query parameters here
      userId: sessionStorage.getItem("userId_param")
      
    };
  
    const token = sessionStorage.getItem('token');
  
    const url = new URL('http://localhost:9000/get-order');
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
    // Fetch orders from the server with query parameters and authorization token
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setOrders(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  return (
    <div>
      <h1>View Orders</h1>
      <pre>{JSON.stringify(orders, null, 2)}</pre>
    </div>
  );
}

export default ViewOrders;
