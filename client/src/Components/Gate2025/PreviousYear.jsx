import React, { useState } from 'react';
import styles from './PreviousYear.module.css';

const YearCards = () => {
  const years = ['2023', '2022', '2021', '2020', '2019', '2018'];

  const branches = {
    '2023': [
      { name: 'Computer Science', pdfUrl: 'https://images.collegedunia.com/public/image/CS_GATE2023_2_9dcb909fba2093af1145bcf9452ada3c.pdf' },
      { name: 'Aerospace', pdfUrl: 'https://images.collegedunia.com/public/image/AE_GATE2023_bf568d394dca85f2f533420ef140ebfe.pdf' },
      { name: 'Agriculture', pdfUrl: 'https://images.collegedunia.com/public/image/AG_GATE2023_57d89bb04fdd199c028acc85f2aa1336.pdf' },
      { name: 'Mechanical', pdfUrl: 'https://images.collegedunia.com/public/image/ME_GATE2023_1_77eae8a20e58172e348e8d9f0b10f5fd.pdf' },
      { name: 'Civil', pdfUrl: 'https://images.collegedunia.com/public/image/CE1_GATE2023_1_68881d6f400c217f20e5ad46460945d5.pdf' },
    ]
    , '2022': [
      { name: 'Computer Science', pdfUrl: 'https://gate.iitkgp.ac.in/documents/gatepapers/2022/cs_2022.pdf' },
      { name: 'Aerospace', pdfUrl: '/pdfs/aerospace2022.pdf' },
      { name: 'Agriculture', pdfUrl: '/pdfs/agriculture2022.pdf' },
      { name: 'Mechanical', pdfUrl: '/pdfs/mechanical2022.pdf' },
      { name: 'Civil', pdfUrl: 'https://gate.iitkgp.ac.in/documents/gatepapers/2022/ce1_2022.pdf' },
    ],
    '2021': [
      { name: 'Computer Science', pdfUrl: 'https://gate.iitkgp.ac.in/documents/gatepapers/2021/cs1_2021.pdf' },
      { name: 'Aerospace', pdfUrl: '/pdfs/aerospace2021.pdf' },
      { name: 'Agriculture', pdfUrl: '/pdfs/agriculture2021.pdf' },
      { name: 'Mechanical', pdfUrl: '/pdfs/mechanical2021.pdf' },
      { name: 'Civil', pdfUrl: 'https://gate.iitkgp.ac.in/documents/gatepapers/2021/ce1_2021.pdf' },
    ],
    '2020': [
      { name: 'Computer Science', pdfUrl: 'https://gate.iitkgp.ac.in/documents/gatepapers/2020/cs_2020.pdf' },
      { name: 'Aerospace', pdfUrl: '/pdfs/aerospace2020.pdf' },
      { name: 'Agriculture', pdfUrl: '/pdfs/agriculture2020.pdf' },
      { name: 'Mechanical', pdfUrl: '/pdfs/mechanical2020.pdf' },
      { name: 'Civil', pdfUrl: 'https://gate.iitkgp.ac.in/documents/gatepapers/2020/ce1_2020.pdf' },
    ],
    '2019': [
      { name: 'Computer Science', pdfUrl: 'https://gate.iitkgp.ac.in/documents/gatepapers/2019/cs_2019.pdf' },
      { name: 'Aerospace', pdfUrl: '/pdfs/aerospace2019.pdf' },
      { name: 'Agriculture', pdfUrl: '/pdfs/agriculture2019.pdf' },
      { name: 'Mechanical', pdfUrl: '/pdfs/mechanical2019.pdf' },
      { name: 'Civil', pdfUrl: 'https://gate.iitkgp.ac.in/documents/gatepapers/2019/ce1_2019.pdf' },
    ],
    '2018': [
      { name: 'Computer Science', pdfUrl: 'https://gate.iitkgp.ac.in/documents/gatepapers/2019/cs_2019.pdf' },
      { name: 'Aerospace', pdfUrl: '/pdfs/aerospace2019.pdf' },
      { name: 'Agriculture', pdfUrl: '/pdfs/agriculture2019.pdf' },
      { name: 'Mechanical', pdfUrl: '/pdfs/mechanical2019.pdf' },
      { name: 'Civil', pdfUrl: 'https://gate.iitkgp.ac.in/documents/gatepapers/2019/ce1_2019.pdf' },
    ],
  };

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
                {branches[year].map((branch) => (
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
