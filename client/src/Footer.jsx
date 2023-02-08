import React from 'react';

function Footer(){
    const year = new Date().getFullYear();
    return(
        <footer>
            <p>A Rishikesh Sarangan Website © {year} </p>
        </footer>
    );
};

export default Footer;