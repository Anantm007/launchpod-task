import BASE_URL from "../../utils/baseUrl";

export const getUser = async () => {
  const user = JSON.parse(localStorage.getItem("jwt")).user;
  const id = user._id;

  return fetch(`${BASE_URL}/api/users/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
