import React from 'react'
import { useState } from 'react';
import {Link} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button, Container, Row,Col,Form,Alert,Spinner } from 'react-bootstrap';

const Login = () => {

  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let [err,setErr] = useState("")

  let handleEmailChange = (e)=>{
    setEmail(e.target.value)
  }
  let handlePassChange = (e)=>{
    setPassword(e.target.value)
  }
  let handleClick = (e)=>{
    e.preventDefault()
    if(!email || !password){
        setErr("Please all filed fillup")
    }else if(password.length < 7){
      setErr("Password must be 8 character")
    }else{
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential.user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
  }
  return (
    <div>
       <Container>
      <Row style={{justifyContent:"center", textAlign:"center",marginTop:"100px"}}>
        <h2>Registration From</h2>
        <Col sm={6}>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="email" onChange={handleEmailChange} name='email' placeholder="Email" value={email} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="password" onChange={handlePassChange} name='password' placeholder="password" value={password} />
          </Form.Group>
          {err ? 
          <Alert variant="danger">
            <Alert.Heading>{err}</Alert.Heading>
          </Alert>
          : 
          ""
          }

          <Button variant="primary" onClick={handleClick}>
            Register Now
            {err ? 
           <Spinner animation="border" variant="danger" size="sm"></Spinner>
          : 
          ""
          }
          </Button>
          <br/>
          <Form.Text id="passwordHelpBlock" muted>
            Already have in Account <Link to="/">Register</Link>
  </Form.Text>
      </Form>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Login
