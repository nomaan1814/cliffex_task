import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import MainScreen from './MainScreen';

const LoginScreen = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [email_err,setEmailErr]=useState({})
    const [pass_err,setPassErr]=useState({})
    const validation=()=>{
        const email_err={}
        const pass_err={}
        let isValid=true;
        if(email==""){
            email_err.required="*Required";
            isValid=false;
        }
        if(password==""){
             pass_err.required="*Required";
             isValid=false;
        }
        setEmailErr(email_err)
        setPassErr(pass_err)
        return isValid;
    }
    const submitHandler=(e)=>{
          e.preventDefault();
          const isValid=validation();
    }
   
  return (
    <MainScreen title='Login'>
    <Form onSubmit={submitHandler}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      {Object.keys(email_err).map((key)=>{
         return <div style={{color:'red'}}>{email_err[key]}</div>
      })}
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      {Object.keys(pass_err).map((key)=>{
         return <div style={{color:'red'}}>{pass_err[key]}</div>
      })}
    </Form.Group>
    <Button variant="dark" type="submit">
      Login
    </Button>
  </Form>
  </MainScreen>
  )
}

export default LoginScreen
