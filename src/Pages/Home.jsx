// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { useLoaderData } from 'react-router-dom';
import TravelCard from '../Components/TravelCard/TravelCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const news = useLoaderData();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className=''>
            <Navbar></Navbar>
            <div>
                <Slider {...settings}>
                    {
                        news.map(data => <TravelCard
                            key={data.id}
                            news={data}
                        ></TravelCard>)
                    }

                </Slider>
            </div>
            <div>


            </div>
        </div>
    );
};

export default Home;