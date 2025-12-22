import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import bannerImg1 from "../../assets/banner/banner1.png"
import bannerImg2 from "../../assets/banner/banner2.png"
import bannerImg3 from "../../assets/banner/banner3.png"
const Banner = () => {
    return (
        <div className='py-10'>
             <Carousel infiniteLoop={true} autoPlay={true} interval={3000} showThumbs={false} transitionTime={600} >
                <div>
                    <img src={bannerImg1} />
                </div>
                <div>
                    <img src={bannerImg2} />
                </div>
                <div>
                    <img src={bannerImg3} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;