import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";
import NavBar from "../components/NavBar";
import Upload from "../pages/Upload";
import Token from "../pages/Token";
import Files from "../pages/Files.jsx";

const AppRouter = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/files" element={<Files />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/token" element={<Token />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
