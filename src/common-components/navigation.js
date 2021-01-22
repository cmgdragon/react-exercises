import React from 'react';
import { NavLink } from "react-router-dom";
import { signOut } from '../auth/authProviders';

const Navigation = ({user}) => {
    return (
        <nav>
            <div className={`sign-out`} onClick={signOut}> Sign Out ({user.displayName})</div>
            <NavLink to="/bikes" activeClassName='active'>Bikes exercice</NavLink>
            <NavLink to="/trivia" activeClassName='active'>Trivia exercice</NavLink>
            <NavLink to="/memory" activeClassName='active'>Memory exercice</NavLink>
        </nav>
    )
}

export default Navigation;