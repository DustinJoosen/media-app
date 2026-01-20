import {Link, NavLink} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{
            background: "linear-gradient(to right, #ff7171, #F1AE4A)"
        }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="logo_cow.png" alt="Logo" width="40px" height="40px" className="my-1 mx-3" />
                    Media Item API Interface
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mx-4">
                        {[
                            {to: "/", label: "Home"},
                            {to: "/files", label: "Files"},
                            {to: "/upload", label: "Upload"},
                            {to: "/token", label: "Tokens"},
                        ].map(({to, label}) => (
                            <li className="nav-item" key={label}>
                                <NavLink className="nav-link text-white mx-1" to={to} style={({ isActive }) => ({
                                    textDecoration: isActive ? 'underline' : 'none',
                                })}
                                >{label}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
