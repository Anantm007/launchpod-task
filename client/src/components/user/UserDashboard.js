import React, { Fragment, useEffect, useState } from "react";
import { getUser } from "./apiUser";

const UserDashboard = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    companyName: "",
    location: "",
    role: "",
    loading: false,
  });

  const { name, email, age, companyName, location, role, loading } = values;

  const setUser = async () => {
    const data = await getUser();

    if (data.success === true) {
      setValues({
        name: data.user.name,
        email: data.user.email,
        age: data.user.age,
        companyName: data.user.companyName,
        location: data.user.location,
        role: data.user.role,
      });
    }
  };
  useEffect(() => {
    setUser();
  }, []); // eslint-disable-line

  return (
    <Fragment>
      <div style={{ textAlign: "center", marginTop: "10rem" }}>
        <h1>User Dashboard</h1>
        <div style={{ margin: "auto" }}>
          <div
            class="card"
            style={{
              width: "25rem",
              margin: "auto",
              background: "black",
              color: "white",
            }}
          >
            <div className="card-body">
              <h4 class="card-title">Name: {name}</h4> <hr />
              <h4 class="card-title">Email: {email}</h4> <hr />
              <h4 class="card-title">Age: {age}</h4> <hr />
              <h4 class="card-title">Company: {companyName}</h4> <hr />
              <h4 class="card-title">Location: {location}</h4> <hr />
              {role === 0 ? (
                <h4 class="card-title">Role: Employee</h4>
              ) : (
                <h4 class="card-title">Role: Admin</h4>
              )}
              {role === 1 && (
                <a href="#" class="btn btn-primary">
                  Edit
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserDashboard;
