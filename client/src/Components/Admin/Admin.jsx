import React, { useState } from 'react';
import styles from './Admin.module.css';
import OSQuiz from './OSQuiz'; // Import the OSQuiz component
import Navbar from '../Navbar';

const AdminPage = () => {
  const [openBranch, setOpenBranch] = useState(false);
  const [openCSE, setOpenCSE] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <>
      <Navbar />
    <div className={styles.adminPage}>
      <div className={styles.content}>
        {/* Render the OSQuiz component only when 'OS' is selected */}
        {selectedSubject === 'OS' && <OSQuiz />}  
        
        {/* Render the welcome message and branches dropdown when no subject is selected */}
        {!selectedSubject && (
          <>
            <h1>Welcome to the Admin Panel</h1>
            <div className={styles.dropdown}>
              <button onClick={() => setOpenBranch(!openBranch)} className={styles.dropbtn}>
                Branches
              </button>
              {openBranch && (
                <div className={styles.dropdownContent}>
                  {openCSE ? (
                    <div className={styles.subDropdownContent}>
                      <button onClick={() => setSelectedSubject('OS')}>OS</button>
                      <button>DBMS</button>
                      <button>Applied Mathematics</button>
                      <button>TOC</button>
                      <button>AI</button>
                      <button>DSA</button>
                      <button onClick={() => setOpenCSE(false)} className={styles.backBtn}>
                        ← Back to Branches
                      </button>
                    </div>
                  ) : (
                    <>
                      <button onClick={() => setOpenCSE(true)}>CSE</button>
                      <button>EEE</button>
                      <button>IT</button>
                      <button>ME</button>
                      <button>CE</button>
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default AdminPage;
