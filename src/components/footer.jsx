import React from "react";

//create a basic footer component with black background and white text that says "This project was created by Jacob Spires for the purpose of camper evaluations. It was made uisng react.js and uses primereact components. Commercial use is prohibited."
const Footer = () => {
    return (
        <footer
        style={{
            backgroundColor: "black",
            color: "white",
            padding: "10px",
            textAlign: "center",
        }}
        >
        This project was created by Jacob Spires for AU Soccer for the purpose of camper
        evaluations. It was made using React.js and uses Primereact components.
        Commercial use is prohibited.
        </footer>
    );
    };

    export default Footer;