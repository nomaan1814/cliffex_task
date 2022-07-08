import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import MainScreen from './MainScreen';
import axios from 'axios';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const LoginScreen = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [email_err,setEmailErr]=useState({})
    const [pass_err,setPassErr]=useState({})
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const navigate=useNavigate();
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
    const submitHandler=async(e)=>{
          e.preventDefault();
          const isValid=validation();
          if(isValid){
            try {
              const config={
                headers:{
                  "Content-type":"application/json"
              }
              }
              setLoading(true)
              const {data}=await axios.post('/api/user/login',{email,password},config)
              localStorage.setItem("userdetail",JSON.stringify(data))
              setLoading(false)
              navigate('/userlist')
            } catch (error) {
                 setError(error.response.data.message)
                 setLoading(false)
            }
               
          }
    }
   
  return (
    <MainScreen title='Login'>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
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
  <Row className='py-2'>
     <Col>
       <Link to='/register'> Click to register an account</Link>
     </Col>
  </Row>
  </MainScreen>
  )
}

export default LoginScreen
