import React from 'react';
import './styles/App.css';
import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import About from "./Pages/About";
import Posts from "./Pages/Posts";
import Navbar from "./components/UI/Navbar/Navbar";
import Error from "./Pages/Error";
import AppRouter from "./components/AppRouter";



function App() {
    return(
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
    )
}

export default App;
