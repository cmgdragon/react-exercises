import React from 'react';
import { Link } from "react-router-dom";
import { signOut } from '../auth/authProviders';

const Navigation = ({user}) => {
    return (
        <nav>
            <div onClick={signOut}> Sign Out ({user.displayName})</div>
            <Link to="/bikes">Bikes exercice</Link>
            <Link to="/trivia">Trivia exercice</Link>
            <Link to="/memory">Memory exercice</Link>
        </nav>
    )
}

export default Navigation;