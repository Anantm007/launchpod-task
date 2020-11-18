import React, { Fragment, useEffect, useState } from "react";
import { getUser } from "./apiUser";

const UserDashboard = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: 0,
    companyName: "",
    location: "",
    role: 0,
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
      <div style={{ textAlign: "center" }}>
        <h1>User Dashboard</h1>
        Name: {name} <br />
        Email: {email}
        <br />
        Age: {age}
        <br />
        Company: {companyName}
        <br />
        Location: {location}
        <br />
        Role: {role}
      </div>
    </Fragment>
  );
};

export default UserDashboard;
