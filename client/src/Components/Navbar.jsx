import React, { useState, useEffect } from "react";
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../store/authSlice";

const Navbar = () => {
    const [navbarVisible, setNavbarVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (token !== null) {
            setLoggedIn(true);
        }

    }, [loggedIn]);

    const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
            setNavbarVisible(false);
        } else {
            setNavbarVisible(true);
        }
        setLastScrollY(window.scrollY);
    };
    const handleLogout = () => {
        dispatch(logout());
        localStorage.clear();
        setLoggedIn(false);
        navigate("/");
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);


    return (
        <nav
            className={styles.navbar}
            style={{
                top: navbarVisible ? "0" : "-100px", // Adjust the negative value according to your navbar's height
            }}
        >
            <Link to={"/"}>
                <img src={'../../images/logo.gif'} alt="" style={{ width: '68px', height: '53px' }} />
            </Link>
            <ul className={styles.menu}>
                <div className={styles.home}>
                    <li className={`${styles.item} ${styles.dropdown}`}>
                        <Link to={""}>Gate2025</Link>
                        <ul className={styles.dropdownMenu}>
                            <li className={styles.dropdownItem}><Link to={"/PreviousYear"}>Previous Year</Link></li>
                            <li className={styles.dropdownItem}><Link to={"/PrepVideos"}>Prep Videos</Link></li>
                            <li className={styles.dropdownItem}><Link to={"/UserOSQuiz"}>Quiz</Link></li>
                        </ul>
                    </li>
                </div>
                {loggedIn ? <button onClick={handleLogout} className={styles.button}>Logout</button> : (<div className={styles.login}>
                    <button className={styles.button}><Link to={"/Login"}>Login</Link></button>
                    <button className={styles.signupButton}><Link to={"/Signup"}>Signup</Link></button>
                </div>)}
            </ul>
        </nav>
    );
};

export default Navbar;
