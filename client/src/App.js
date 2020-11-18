import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Layout
import Navbar from "./components/layout/Navbar";

// User
import Login from "./components/user/Login";
import UserDashboard from "./components/user/UserDashboard";

// Admin
import AdminDashboard from "./components/user/AdminDashboard";

// Products
import Products from "./components/products/Products";

// Utilities
import PrivateRoute from "./components/userAuth/PrivateRoute";
import AdminRoute from "./components/userAuth/AdminRoute";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/" component={Login} />

        <Route exact path="/user/login" component={Login} />
        <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
        <PrivateRoute exact path="/user/products" component={Products} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      </Switch>
    </Router>
  );
};

export default App;
