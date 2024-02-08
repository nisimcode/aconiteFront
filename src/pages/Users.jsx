import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {USERS_URL} from "../utils/url";
import AuthContext from "../context/AuthContext.jsx";

const Users = () => {
  const {authHeadersConfig} = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);


  useEffect(() => {
    axios.get(USERS_URL, authHeadersConfig)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("Unauthorized");
          navigate("/");
        } else {
          console.error("Error: ", error);
          // Handle decorators errors here
        }
      });
  }, []);

  return (
    <>
      {users.map((user, index) => (
        <div key={index}>
          <h4>
            Username: {user.username}, Email: {user.email ? user.email : " unknown"}
          </h4>
        </div>
      ))}
    </>
  );
};

export default Users;
