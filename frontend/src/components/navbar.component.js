import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar  extends Component{

    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/materials" className="navbar-brand"> &nbsp;&nbsp;LMS</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/materials" className="nav-link">Materials</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/add-material" className="nav-link">Add Material</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/delete-material" className="nav-link">Delete Material</Link>
                        </li>
                    </ul>

                </div>

            </nav>
        );
    }
}
