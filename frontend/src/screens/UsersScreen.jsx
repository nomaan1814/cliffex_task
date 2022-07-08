import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import MainScreen from './MainScreen';
import Table from 'react-bootstrap/Table';

const UsersScreen = () => {
    const navigate=useNavigate()
    const [user,setUser]=useState([]);
    let count=0;
    const authorized=async()=>{
      try {
        let user=JSON.parse(localStorage.getItem("userdetail"))
      const config={
        headers:{
          'Content-Type':'application/json',
            Authorization:`Bearer ${user.token}`
        }
      }  
    const { data }=await axios.get('/api/user/all',config)
    setUser(data.data)
    
} catch (error) {
     navigate('/')
}
    }
  useEffect(()=>{
    authorized()
  },[navigate,user])
  return (
   <MainScreen title='Users List'>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
        </tr>
      </thead>
      <tbody>
        {
        
          user.map((ele,ind)=>(
            <tr key={ind}>
            <td>{ind+1}</td>
            <td>{ele.name}</td>
            <td>{ele.email}</td>
            <td>{ele.mobile}</td>
          </tr>
          ))
        }
        
        
      </tbody>
    </Table>
   </MainScreen>
  )
}

export default UsersScreen
