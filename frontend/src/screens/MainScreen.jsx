import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'

const MainScreen = ({title,children}) => {
  return (
    <Container>
        <Row className='my-4'>
            <div style={{width:"100%"}}>
                {
                    title &&<h1 className='heading pb-2'>{title}</h1>
                }
                {
                    children
                }
            </div>
        </Row>
    </Container>
  )
}

export default MainScreen
