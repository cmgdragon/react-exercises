import React from 'react';
import { NavLink } from "react-router-dom";
import { signOut } from '../auth/authProviders';

const Navigation = ({ user }) => {
    return (
        <nav>
            <div className={`sign-out`} onClick={signOut}> Sign Out ({user.displayName})</div>
            <NavLink to="/bikes" activeClassName='active'>Bikes exercise</NavLink>
            <NavLink to="/trivia" activeClassName='active'>Trivia exercise</NavLink>
            <NavLink to="/memory" activeClassName='active'>Memory exercise</NavLink>
        </nav>
    )
}

export default Navigation;