import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Login from './login';
import Home from './home';
import Consumer,{LoggedInContextProvider} from './loggedInContextProvider';
function App() {
    const [isLogged, setIsLogged] = useState(false);
    const [uid, setUid] = useState();
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
                                {ctx.loggedIn && <Home />}
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
