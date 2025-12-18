import {Link, NavLink} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

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
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mx-4">
                        <li className="nav-item">
                            <NavLink className="nav-link text-white mx-1" to="/" style={({ isActive }) => ({
                                textDecoration: isActive ? 'underline' : 'none',
                            })}
                            >Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white mr-5" to="/files" style={({ isActive }) => ({
                                textDecoration: isActive ? "underline" : "none",
                            })}
                            >Files</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white mr-5" to="/upload" style={({ isActive }) => ({
                                textDecoration: isActive ? "underline" : "none",
                            })}
                            >Upload</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white mr-5" to="/token" style={({ isActive }) => ({
                                textDecoration: isActive ? "underline" : "none",
                            })}
                            >Tokens</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
