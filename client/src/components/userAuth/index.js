import BASE_URL from "../../utils/baseUrl";

// Login User
export const signin = async (user) => {
  return fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Save token in storage
export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    if (JSON.parse(localStorage.getItem("shopjwt"))) {
      localStorage.removeItem("shopjwt");
    }

    localStorage.setItem("jwt", JSON.stringify(data));
  }
};

// Signout so destroy the local token
export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    window.location.reload(false);
  }
};

// Return if user is authenticated or not
export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
