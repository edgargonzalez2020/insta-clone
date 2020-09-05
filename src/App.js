import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Login from './login';
import Home from './home';
import Consumer,{LoggedInContextProvider} from './loggedInContextProvider';
function App() {
    return (
        <div className="App">
            <LoggedInContextProvider>
                <Consumer>
                {
                    ctx =>
                    {
                        return(
                            <React.Fragment>
                                {!ctx.loggedIn && <Login/>}
                                {ctx.loggedIn && <Home uid={ctx.profile.uid} userName={ctx.profile.userName}/>}
                            </React.Fragment>
                        );
                    }
                }
                </Consumer>
            </LoggedInContextProvider>
        </div>
    );
}

export default App;
