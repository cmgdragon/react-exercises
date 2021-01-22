import React, { useContext } from 'react';
import BikeList from './exercise-bikes/components/bikeList';
import TriviaGame from './exercise-trivia/components/triviaGame';
import MemoryGame from './exercise-memory/components/memoryGame';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './common-components/login';
import { AuthContext } from './auth/authContext';
import Navigation from './common-components/navigation';

const App = () => {

    const user = useContext(AuthContext);

    return (
        <Router>
            
            {
                !user ? <Login /> : 
                <>
                    <Navigation user={user} />
                    <Switch>
                        <Route path='/bikes' render={() => <BikeList user={user} />} />
                        <Route path='/trivia' render={() => <TriviaGame user={user} />} />
                        <Route path='/memory' render={() => <MemoryGame user={user} />} />
                    </Switch>
                </>
            }
        </Router>
    )
}

export default App;