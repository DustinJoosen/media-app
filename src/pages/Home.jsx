import React from 'react';
import HealthInfo from "../components/HealthInfo.jsx";
import "../css/home.css"

const Home = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="home-container">
                <HealthInfo />
            </div>
        </div>
    );
};

export default Home;
