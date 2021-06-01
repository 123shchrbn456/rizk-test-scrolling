import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideMenu from "./components/layout/SideMenu";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import BetsHistory from "./components/pages/BetsHistory";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import ApiState from "./context/apiCtx/ApiState";
import BetslipState from "./context/betslip/BetslipState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    return (
        <AlertState>
            <AuthState>
                <ApiState>
                    <BetslipState>
                        <Router>
                            <Fragment>
                                <SideMenu />
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route
                                        exact
                                        path="/sportbook/:sportType"
                                        component={Home}
                                    />
                                    <Route
                                        exact
                                        path="/sportbook/:sportType/:sportLeague"
                                        component={Home}
                                    />
                                    <Route
                                        exact
                                        path="/sportbook/:sportType/:sportLeague/:sportEvent"
                                        component={Home}
                                    />
                                    <Route
                                        exact
                                        path="/bets-history"
                                        component={BetsHistory}
                                    />
                                    <Route
                                        exact
                                        path="/about"
                                        component={About}
                                    />
                                </Switch>
                                <Login />
                                <Register />
                            </Fragment>
                        </Router>
                    </BetslipState>
                </ApiState>
            </AuthState>
        </AlertState>
    );
};

export default App;
