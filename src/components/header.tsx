import React from 'react';
import AuSoccer2023 from '../images/au-soccer-camp-2023.jpg';

const Header: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <header style={{ backgroundColor: '#F57920', textAlign: 'center' }}>
            <img src={AuSoccer2023} alt="AU Soccer Camp" style={{ width: '500px', height: '300px' }} />
            <h1>{currentYear} Anderson University Soccer Camp Player Evaluation</h1>
        </header>
    );
};

export default Header;