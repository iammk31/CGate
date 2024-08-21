import React, { useState } from 'react';
import styles from './PreviousYear.module.css';

const YearCards = () => {
    const years = ['2023', '2022', '2021', '2020', '2019', '2018'];
    const branches = [
        { name: 'Computer Science', pdfUrl: 'https://gate.iitkgp.ac.in/documents/gatepapers/2022/cs_2022.pdf' },
        { name: 'Aerospace', pdfUrl: '/pdfs/aerospace.pdf' },
        { name: 'Agriculture', pdfUrl: '/pdfs/agriculture.pdf' },
        { name: 'Mechanical', pdfUrl: '/pdfs/mechanical.pdf' },
        { name: 'Civil', pdfUrl: '/pdfs/civil.pdf' },
    ];

    const [selectedYear, setSelectedYear] = useState(null);

    const handleCardClick = (year) => {
        if (selectedYear === year) {
            setSelectedYear(null); // Close the list if the same year is clicked again
        } else {
            setSelectedYear(year);
        }
    };

    const handleBranchClick = (pdfUrl) => {
        window.open(`${process.env.PUBLIC_URL}${pdfUrl}`, '_blank');
    };

    return (
        <div>
            <h1 className={styles.title}>Previous Year Papers</h1>
            <div className={styles.cardContainer}>
                {years.map((year) => (
                    <div key={year} className={styles.yearCard} onClick={() => handleCardClick(year)}>
                        {year}
                        {selectedYear === year && (
                            <div className={styles.branchList}>
                                {branches.map((branch) => (
                                    <div
                                        key={branch.name}
                                        className={styles.branchItem}
                                        onClick={() => handleBranchClick(branch.pdfUrl)}
                                    >
                                        {branch.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YearCards;
