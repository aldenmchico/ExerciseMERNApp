// Import React ES Modules
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='../create-exercise'>New Exercise</Link>
        </nav>
    );
}

export default Navigation;