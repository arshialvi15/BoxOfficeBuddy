import './Navbar.css'

import { Link } from "react-router-dom";

export default function Navbar() {
    return (

        <nav class="navbar ">
            <div class="container-fluid" id='nav-container'>
                <h1 class="navbar-brand" id='nav-title' ><span id='nav-title2'>🎥Bole</span>to</h1>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to={'/'}>
                            <h1 className="nav-link active" id='nav-item' style={{ textDecoration: 'none' }} >Home</h1>
                            {/* <p>Home</p> */}
                        </Link>
                    </li>
                </ul>
                <Link to={'/signup'}>
                    <button class="btn btn-outline" id='nav-btn' type="submit">Join Now</button>
                </Link >
                <Link to={'/userprofile'}>
                    <button class="btn btn-outline" type="submit" id='nav-btn2' >User Profiles</button>
                </Link >
            </div>
        </nav>
    )
}
