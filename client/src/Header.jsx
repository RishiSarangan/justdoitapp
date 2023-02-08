import React from 'react';
import axios from 'axios';

function Header(props){

    return(
        <header>
            <h1 id = "title">Just. Do. It.</h1>
            <p id = "quote">"{props.quote}"</p>
        </header>
    );
};

export default Header;