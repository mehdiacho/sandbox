import React from "react";
import {UserAuth} from "../../config/auth-context";

export default function Navbar(props) {
    const { logOut } = UserAuth();

    return (

        <nav className="navbar navbar-expand-lg navbar-dark text-bg-dark sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/home" style={{ fontSize: '25px', fontWeight: 'bold' }}>Intellicy</a>
                <div className="order-lg-last">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav navbar-nav-right mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className={`nav-link ${props.page === 'home' ? 'active' : ''}`} aria-current="page" href="/home" style={{ fontSize: '18px' }}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${props.page === 'about' ? 'active' : ''}`} href="/about" style={{ fontSize: '18px' }}>About</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${props.page === 'documents' ? 'active' : ''}`} href="/documents" style={{ fontSize: '18px' }}>Documents</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${props.page === 'docs2' ? 'active' : ''}`} href="/docs2" style={{ fontSize: '18px' }}>Docs2</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${props.page === 'upload' ? 'active' : ''}`} href="/upload" style={{ fontSize: '18px' }}>Upload Docs</a>
                        </li>
                        <li className="nav-item" >
                            <button type="button" className="btn btn-outline-danger" onClick={() => logOut()} style={{ fontSize: '18px' }}>Log Out</button>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>

    )
}