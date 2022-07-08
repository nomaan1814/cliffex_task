import React from 'react';
import Alert from 'react-bootstrap/Alert';

const ErrAlert = (props) => {
  return (
    <Alert variant='danger'>
         {props.error.map((ele,ind)=>(
           <li key={ind}>{ele}</li>
         ))}
    </Alert>
  )
}

export default ErrAlert
