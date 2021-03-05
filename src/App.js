//import external fucntions
import React from 'react';
import './App.css';

import Home from "./pages/Home"
import AllStock from "./pages/AllStocks"
import SearchStock from "./pages/SearchStock"
import AuthedSearch from "./pages/AuthedSearchStock"
import Login from "./pages/Login"
import Register from "./pages/Register"

import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";

//delare the function to display the nav bar
function Header() {
  return (
    <div>
      <NavStocks />
      <NavUser />
    </div>
  )
}

//function to create the right side of the nav bar
function NavUser() {
  return (
    <nav id="User">
      <ul>
        <li>
          <Link to="/user/register">Register</Link>
        </li>
        <li>
          <Link to="/user/login">Login</Link>
        </li>
      </ul>
    </nav>
  )
}

//function to create the left side of the nav bar
function NavStocks() {
  return (
    <nav id="Stocks">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/stocks/symbols">All Stocks</Link>
        </li>
        <li>
          <Link to="/stocks/symbol">Search Stocks</Link>
        </li>
        <li>
          <Link to="/stock/authed/symbol">Authenticated Search</Link>
        </li>
      </ul>
    </nav>
  )
}

//function being exported which allows for the nav bar to be present on every page and functional using Router
export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <div>

          <Route exact path="/">
            <Home />
          </Route>

          <Switch>

            <Route path="/stocks/symbols">
              <AllStock />
            </Route>

            <Route path="/stocks/symbol">
              <SearchStock />
            </Route>

            <Route path="/stock/authed/symbol">
              <AuthedSearch />
            </Route>

            <Route path="/user/register">
              <Register />
            </Route>

            <Route path="/user/login">
              <Login />
            </Route>

          </Switch>
        </div>

      </div>
    </Router>

  );
}