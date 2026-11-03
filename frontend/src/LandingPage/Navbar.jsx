import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">

                {/* Logo */}
                <a href="/" className="navbar-logo">
                    <img
                        src="/media/images/main-logo.png"
                        alt="Lakshya Sparsh"
                    />
                </a>

                {/* Menu */}
                <div className="navbar-menu">
                    <Link to="/about">About Us</Link>
                    <Link to="/start">Start Investing</Link>
                    <Link to="/nri">NRI Corner</Link>
                    <Link to="/downloads">Downloads</Link>
                    <Link to="/gallery">Gallery</Link>
                    <Link to="/contact">Contact Us</Link>

                    <Link to="/login" className="login-btn">
                        Login
                    </Link>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;