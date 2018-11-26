import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import './home.css';
import { Search, Faqs } from '../index'
const hasUnlimitedAccess = (name) => name === "Luke Skywalker";
export class Home extends Component {
    render() {
        const { name } = this.props;
        return (
            <div className="container container-fluid">
                <div>
                    <h2>Welcome {name}
                        <span className="logout-link">
                            <Link to='/login'>
                                Logout
                            </Link>
                        </span>
                    </h2>
                    {!hasUnlimitedAccess(name) && <p className="alert alert-info">Seems like you have limited access (Only 15 search per minutes).</p>}
                    {hasUnlimitedAccess(name) && <p className="alert alert-info">Seems like you have un-limited access (unlimited search per minutes).</p>}
                    <div className="container">
                        <Search hasUnlimitedAccess={hasUnlimitedAccess(name)} />


                        <Faqs />
                    </div>
                </div>
            </div>
        );
    }
}
