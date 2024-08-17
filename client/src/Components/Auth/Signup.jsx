import React from 'react';
import './Signup.css';
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";



const Signup = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/v1/cgate/send",
                { firstName, lastName, email, phone, date, time },
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
            setTime("");
            setDate("");
            navigate("/success");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    return (

        <div className="banner">
            <div className="reservation_form_box">
                <h1>SignUp</h1>
                <p>For Further Questions, Please Call</p>
                <form>
                    <div>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="date"
                            placeholder="Date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <input
                            type="time"
                            placeholder="Time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="email_tag"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <button type="submit" onClick={handleSignup}>
                        SignUp{" "}
                        <span>
                            <HiOutlineArrowNarrowRight />
                        </span>
                    </button>
                </form>
            </div>
        </div>


    );
}

export default Signup;