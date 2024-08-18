import React, { useState, useEffect } from "react";
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [navbarVisible, setNavbarVisible] = useState(false);

    const scrollFunction = () => {
        if (window.scrollY > 20) {
            setNavbarVisible(true);
        } else {
            setNavbarVisible(false);
        }
    };

    useEffect(() => {
        window.onscroll = scrollFunction;
        return () => {
            window.onscroll = null;
        };
    }, []);

    return (
        <nav className={styles.navbar} style={{ top: navbarVisible ? "0" : "0px", }}>
            
                <Link to={"/"}>
                    <img src={'../../images/logo.gif'} alt="" style={{ width: '68px', height: '53px' }} />
                </Link>
        
            <ul className={styles.menu}>
                <div className={styles.home}>
                    <li className={styles.item}><Link to={"/"}>Home</Link></li>
                    <li className={styles.item}><Link to={"/courses"}>Courses</Link></li>
                    <li className={`${styles.item} ${styles.dropdown}`}>
                        <Link to={"/gate-special"}>Gate2025</Link>
                        <ul className={styles.dropdownMenu}>
                            <li className={styles.dropdownItem}><Link to={"/gate-overview"}>Overview</Link></li>
                            <li className={styles.dropdownItem}><Link to={"/gate-schedule"}>Schedule</Link></li>
                            <li className={styles.dropdownItem}><Link to={"/gate-resources"}>Resources</Link></li>
                        </ul>
                    </li>
                </div>
                <div className={styles.login}>
                    <button className={styles.button}><Link to={"/Login"}>Login</Link></button>
                    <button className={styles.signupButton}><Link to={"/Signup"}>Signup</Link></button>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;
