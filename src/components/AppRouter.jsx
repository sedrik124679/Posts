import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import About from "../Pages/About";
import Posts from "../Pages/Posts";
import Error from "../Pages/Error";
import PostIdPage from "../Pages/PostIdPage";
import {routes} from "../Router/Routes";

const AppRouter = () => {
    return (
        <Switch>
            {routes.map(route =>
                <Route component={route.component}
                       path={route.path}
                       exact={route.exact} />
            )}
            <Redirect to='/posts'/>
        </Switch>
    );
};

export default AppRouter;