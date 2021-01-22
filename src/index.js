import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthUserContext from './auth/authContext';
AuthUserContext

ReactDOM.render(
    <AuthUserContext>
        <App/>
    </AuthUserContext>
, document.getElementById("root"));