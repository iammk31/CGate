import React, { useState } from "react";
import styles from "./Admin.module.css";
import OSQuiz from "./OSQuiz"; // Import the OSQuiz component
import Navbar from "../Navbar";
import Footer from "../Footer";

const AdminPage = () => {
  const [openBranch, setOpenBranch] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [subjects, setSubjects] = useState([]);

  // Define branch-specific subjects
  const branchSubjects = {
    CSE: ["OS", "DBMS", "Applied Mathematics", "TOC", "DSA"],
    EEE: ["Circuits", "Control Systems", "Power Electronics"],
    IT: ["Web Development", "Network Security", "Cloud Computing"],
    ME: ["Thermodynamics", "Fluid Mechanics", "Machine Design"],
    CE: ["Structural Analysis", "Geotechnical Engineering", "Construction Management"],
  };

  // Handle branch selection
  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setSubjects(branchSubjects[branch]); // Set subjects based on branch
    setSelectedSubject(null); // Reset selected subject when changing branch
    setOpenBranch(false); // Close the branch dropdown
  };

  // Handle subject selection
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <>
      <Navbar />
      <div className={styles.adminPage}>
        <div className={styles.content}>
          {/* Render the quiz component only when a subject is selected */}
          {selectedSubject && <OSQuiz subject={selectedSubject} />}

          {/* Show welcome message and branch/subject dropdowns when no subject is selected */}
          {!selectedSubject && (
            <>
              <h1>Welcome to the Admin Panel</h1>
              <div className={styles.dropdown}>
                {/* Branch Dropdown */}
                <button
                  onClick={() => setOpenBranch(!openBranch)}
                  className={styles.dropbtn}
                >
                  {selectedBranch ? `Branch: ${selectedBranch}` : "Branches"}
                </button>
                {openBranch && (
                  <div className={styles.dropdownContent}>
                    {!selectedBranch && (
                      <>
                        <button onClick={() => handleBranchSelect("CSE")}>CSE</button>
                        <button onClick={() => handleBranchSelect("EEE")}>EEE</button>
                        <button onClick={() => handleBranchSelect("IT")}>IT</button>
                        <button onClick={() => handleBranchSelect("ME")}>ME</button>
                        <button onClick={() => handleBranchSelect("CE")}>CE</button>
                      </>
                    )}
                  </div>
                )}

                {/* Subject Dropdown: Only show after a branch is selected */}
                {selectedBranch && (
                  <div className={styles.subjectSelection}>
                    <h2>Select a Subject from {selectedBranch}</h2>
                    <div className="flex flex-col gap-2 items-start">
                      {subjects.map((subject) => (
                        <button
                          key={subject}
                          onClick={() => handleSubjectSelect(subject)}
                          className={"rounded-lg px-4 py-2 bg-slate-500 text-white"}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedBranch('')}
                      className={styles.backBtn}
                    >
                      ← Back to Branches
                    </button>
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
