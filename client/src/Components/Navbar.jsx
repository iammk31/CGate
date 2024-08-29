import React, { useState, useEffect } from "react";
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [navbarVisible, setNavbarVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
            setNavbarVisible(false);
        } else {
            setNavbarVisible(true);
        }
        setLastScrollY(window.scrollY);
    };

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
                    <li className={styles.item}><Link to={"/"}>Home</Link></li>
                    <li className={styles.item}><Link to={"/Admin"}>Admin</Link></li>
                    <li className={`${styles.item} ${styles.dropdown}`}>
                        <Link to={""}>Gate2025</Link>
                        <ul className={styles.dropdownMenu}>
                            <li className={styles.dropdownItem}><Link to={"/PreviousYear"}>Previous Year</Link></li>
                            <li className={styles.dropdownItem}><Link to={"/PrepVideos"}>Prep Videos</Link></li>
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
};

export default Navbar;
