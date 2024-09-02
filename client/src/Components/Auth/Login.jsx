import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import './Login.css';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useDispatch } from 'react-redux'
import { login } from '../../store/authSlice';



const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/cgate/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      const { token, user } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      if (data.token!=null && data.user.uType === "admin") {
          dispatch(login({ token, user }));
          localStorage.setItem('admin', data.user.uType);
          navigate("/admin");
      }else{
        dispatch(login({ token, user }));
        navigate("/");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <>
    <Navbar/>
    <MDBContainer className="register-container">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <img src='../../images/LoginImage.png' alt="login form" style={{ width: '500px', height: '650px' }} />
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                <img src={'../../images/logo2.gif'} alt="" style={{ width: '68px', height: '55px' }} />
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Login into your account</h5>

              <MDBInput wrapperClass='mb-4'
                label='Email address'
                id='formControlLg'
                type='email'
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4'
                label='Password'
                id='formControlLg'
                type='password'
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />

              <button className="button-Login"
                type="submit"
                onClick={handleLogin}>Login</button>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <Link to="/signup" style={{ color: '#393f81' }}>Register here</Link></p>

              <div className='d-flex flex-row justify-content-start'>
                <Link to="/" className="small text-muted me-1">Terms of use.</Link>
                <Link to="/" className="small text-muted">Privacy policy</Link>
              </div>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
    <Footer/>
    </>
  );
}

export default Login;