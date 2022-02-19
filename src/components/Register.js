import React from 'react'
import { useState } from 'react';
import {Link} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword,sendEmailVerification } from '../firebase'
import { Button, Container, Row,Col,Form,Alert,Spinner } from 'react-bootstrap';
const Register = () => {
  let [username,setUsername] = useState("")
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let [conpass,setConpass] = useState("")
  let [err,setErr] = useState("")
  let [sesmsg,setSesmsg] = useState("")

  let handleUserChange = (e)=>{
    setUsername(e.target.value)
  }
  let handleEmailChange = (e)=>{
    setEmail(e.target.value)
  }
  let handlePassChange = (e)=>{
    setPassword(e.target.value)
  }
  let handleConChange = (e)=>{
    setConpass(e.target.value)
  }
  let handleClick = (e)=>{
    e.preventDefault()
    if(!username || !email || !password || !conpass){
        setErr("Please all filed fillup")
    }
    else if(password.length < 7 || conpass.length < 7){
      setErr("Password must be 8 character")
    }else if(password !== conpass){
      setErr("Password Does not Matching")
    }else{
        const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSesmsg("Account Created Successfully Done")
        setUsername("")
        setEmail("")
        setPassword("")
        conpass("")
        setErr("")
        sendEmailVerification(auth.currentUser)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }
  }
  return (
    <div>
      <Container>
      <Row style={{justifyContent:"center", textAlign:"center",marginTop:"100px"}}>
        <h2>Registration From</h2>
        <Col sm={6}>
        {sesmsg ? 
        <Alert variant="success">
            <Alert.Heading>{sesmsg}</Alert.Heading>
        </Alert>
        : 
        ""}
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" onChange={handleUserChange} name='username' placeholder="Username" value={username} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="email" onChange={handleEmailChange} name='email' placeholder="Email" value={email} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="password" onChange={handlePassChange} name='password' placeholder="password" value={password} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="password" onChange={handleConChange} name='conpass' placeholder="Con-password" value={conpass} />
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
            Dont have in Account <Link to="login">Login</Link>
  </Form.Text>
      </Form>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Register
