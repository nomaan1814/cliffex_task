import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MainScreen from './MainScreen';
import axios from 'axios';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ErrAlert from '../components/ErrAlert';

const RegisterScreen = () => {
   const initialValues={username:"",email:"",password:"",mobile:""};
   const [formValues,setFormValue]=useState(initialValues);
   const [formErrors,setFormErrors]=useState({});
   const [error,setError]=useState(null);
   const [loading,setLoading]=useState(false)
   const [errArr,setErrArr]=useState([]);
    const navigate=useNavigate();
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormValue({...formValues,[name]:value})
    }
    const validate=(values)=>{
        const errors={};
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let regexName=/^[a-zA-Z ]+$/
        if(!values.username){
            errors.username="Name is required"
        }
        else if(!regexName.test(values.username)){
            errors.username="Enter a valid name"
        }
        else if(values.username.length<3){
            errors.username="Enter a valid name"
        }
        if(!values.email){
            errors.email="Email is required"
        }
        else if(!regexEmail.test(values.email)){
            errors.email="Enter a valid email"
        }
        if(!values.password){
            errors.password="Password is required"
        }
        else if(values.password.length<8){
            errors.password="Password should contain 8 characters"
        }
        if(!values.mobile){
            errors.mobile="Mobile no. is required"
        }
        else if(values.mobile.length>10 || values.mobile.length<10){
            errors.mobile="Enter a valid mobile no"
        }
        return errors;
    }
    
    const submitHandler=async(e)=>{
          e.preventDefault();
          setFormErrors(validate(formValues));
          if(Object.keys(formErrors).length>0){
            try {
              const config={
                headers:{
                  "Content-type":"application/json"
              }
              }
              setLoading(true)
                const {username,email,password,mobile}=formValues;
              const data=await axios.post('/api/user/register',{name:username,email,password,mobile},config)
              setLoading(false)
              alert('Registered successfully')
              navigate('/login')
            } catch (error) {
              if(error.response.status==422){
                setErrArr([error.response.data.message.split(',')])  
           }
           else{
             setError(error.response.data.message)
           }
                 setLoading(false)
            }
               
          }
    }
   
  return (
    <MainScreen title='Sign Up'>
      {loading && <Loader />}
      {errArr.length>0 && <ErrAlert error={errArr} />}
      {error && <Message variant='danger'>{error}</Message>}
    <Form onSubmit={submitHandler}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" name="username" placeholder="Enter name" value={formValues.username} onChange={handleChange}/>
      <div style={{color:'red'}}>{formErrors.username}</div>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" name="email" placeholder="Enter email" value={formValues.email} onChange={handleChange}/>
      <div style={{color:'red'}}>{formErrors.email}</div>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange}/>
      <div style={{color:'red'}}>{formErrors.password}</div>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Mobile</Form.Label>
      <Form.Control type="number" name="mobile" placeholder="Mobile No" value={formValues.mobile} onChange={handleChange}/>
      <div style={{color:'red'}}>{formErrors.mobile}</div>
    </Form.Group>
    <Button variant="dark" type="submit">
      Sign Up
    </Button>
  </Form>
  <Row className='py-2'>
     <Col>
       <Link to='/login'>Click here to login?</Link>
     </Col>
  </Row>
  </MainScreen>
  
  )
}

export default RegisterScreen
