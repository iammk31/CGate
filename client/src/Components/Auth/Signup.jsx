import React from 'react';
import './Signup.css';
// import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
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




const Signup = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/v1/cgate/send",
                { firstName, lastName, email, phone, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            toast.success(data.message);
            setFirstName("");
            setLastName("");
            setPhone("");
            setEmail("");
            setPassword("");
            navigate("/success");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    return (

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

                            <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>SignUp into your account</h5>

                            <MDBInput wrapperClass='mb-4'
                                label='FirstName'
                                id='formControlLg'
                                type='text'
                                size="lg"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} />
                            <MDBInput wrapperClass='mb-4'
                                label='LastName'
                                id='formControlLg'
                                type='text'
                                size="lg"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)} />

                            <MDBInput wrapperClass='mb-4'
                                label='Email address'
                                id='formControlLg'
                                type='email'
                                size="lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <MDBInput wrapperClass='mb-4'
                                label='Phone'
                                id='formControlLg'
                                type='number'
                                size="lg"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)} />
                            <MDBInput wrapperClass='mb-4'
                                label='Password'
                                id='formControlLg'
                                type='password'
                                size="lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />

                            <button className="button-Login"
                                type="submit"
                                onClick={handleSignup}>SignUp</button>

                            <div className='d-flex flex-row justify-content-start'>
                                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                                <a href="#!" className="small text-muted">Privacy policy</a>
                            </div>

                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>
            </MDBCard>

        </MDBContainer>


    );
}

export default Signup;