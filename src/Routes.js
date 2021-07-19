import React, { Profiler } from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Add from './core/Add';
import Home from "./core/Home"
import Login from './core/Login';
import Profile from './core/Profile';

const Routes = () => {
    return ( 
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/add" exact component={Add}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/profile" exact component={Profile}/>
            </Switch>
        </Router>
     );
}
 
export default Routes;