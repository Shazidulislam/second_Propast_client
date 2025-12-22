import React from 'react';
import Banner from '../../Components/Home/Banner';
import BeMarcent from '../../Components/Home/BeMarcent';
import OurServices from '../../Components/Home/OurServices';
import ClientLogos from '../../Components/Home/ClientLogos';
import FeatureCards from '../../Components/Home/FetureCards';

const Home = () => {
    return (
        <div>
            {/* banner sction */}
           <section>
            <Banner></Banner>
           </section>
       
             {/* OurServices */}
            <section>
                <OurServices/>
            </section>
            {/* clients logos */}
                <section>
            <ClientLogos/>
           </section>
           {/* be a marcent */}
            <section>
                <BeMarcent/>
            </section>
            {/* feture cards */}
            <section>
                <FeatureCards/>
            </section>
        </div>
    );
};

export default Home;