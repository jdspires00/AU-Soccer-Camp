import React from 'react';
import AuSoccer from '../images/au-soccer-camp.jpg';

const Header = () => {
    const currentYear = new Date().getFullYear();

    return (
        <header style={{ backgroundColor: '#F57920', textAlign: 'center' }}>
            <img src={AuSoccer} alt="AU Soccer Camp" style={{ width: '67vw', height: '33vh', marginTop: '30px'}} />
            <h1 style={{marginBottom: "10px"}}>{currentYear} Anderson University Soccer Camp Player Evaluation</h1>
            
        </header>
    );
};

export default Header;