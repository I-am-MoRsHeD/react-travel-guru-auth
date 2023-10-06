// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const TravelDetails = () => {
    return (
        <div>
            <h2>Details</h2>
            <button className='btn btn-accent'><Link to='/'>Home</Link></button>
        </div>
    );
};

export default TravelDetails;