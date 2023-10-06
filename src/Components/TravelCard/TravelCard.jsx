// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const TravelCard = ({ news }) => {
    console.log(news)
    const { id, image_url, thumbnail_url, title, details } = news;

    return (
        <div 
        style={{backgroundImage: `url(${thumbnail_url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}
        className={`flex my-10 items-center gap-10 justify-between px-10`}>
            <div className=' '>
                <h1 className="text-4xl font-bold">{title}</h1>
                <p className="text-lg">{details}</p>
                <Link to={`/travel/${id}`}>
                    <button className='btn btn-warning'>Booking-^</button>
                </Link>
            </div>
            <div className='w-full relative flex justify-end'>
                <div className=''>
                    <img className='w-48' src={image_url} alt="" />
                    <p className='text-xl font-bold'>{title}</p>
                </div>
            </div>
        </div>
    );
};

export default TravelCard;