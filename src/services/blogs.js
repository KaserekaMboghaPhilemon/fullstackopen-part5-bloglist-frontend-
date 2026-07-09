import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;

// Changes the internal token value when a user logs in or mounts
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

// Fetches all blogs
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// Adds the new create function with custom authorization headers
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export default { getAll, create, setToken };
