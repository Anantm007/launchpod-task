import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../userAuth";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const { email, password, loading, error } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.success === false) {
        setValues({ ...values, error: data.message, loading: false });
      } else {
        window.location.reload(false); // To reload the page for navbar updation
        authenticate(data, () => {
          setValues({ ...values, loading: false });
        });
      }
    });
  };

  const loginForm = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <form className="box">
              <h1>Login</h1>
              <p className="text-muted">
                {" "}
                Please enter your login and password!
              </p>
              <input
                type="text"
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                placeholder="Email"
              />
              <input
                type="password"
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                placeholder="Enter Your Password"
              />
              <input type="submit" onClick={clickSubmit} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showLoading = () => loading && <p>Loading......</p>;

  const redirectUser = () => {
    if (isAuthenticated() && isAuthenticated().user.role === 0) {
      return <Redirect to="/user/dashboard" />;
    }

    if (isAuthenticated() && isAuthenticated().user.role === 1) {
      return <Redirect to="/admin/dashboard" />;
    }
  };

  return loading ? (
    <div>{showLoading()}</div>
  ) : (
    <Fragment>
      {showError()}
      {showLoading()}
      {redirectUser()}
      {loginForm()}
    </Fragment>
  );
};

export default Login;
