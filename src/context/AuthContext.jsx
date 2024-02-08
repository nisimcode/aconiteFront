import {createContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {ACTIVATE_URL, DEACTIVATION_URL, GET_TOKEN_URL, REFRESH_TOKEN_URL, SIGNUP_URL,} from "../utils/url.js";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export default AuthContext;

export const AuthProvider = ({children}) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const signInUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(GET_TOKEN_URL, {
        username: event.target.username.value,
        password: event.target.password.value,
      });
      if (response.status === 200) {
        const data = response.data;
        const decoded = jwtDecode(data.access);
        setAuthTokens(data);
        setUser(decoded);
        localStorage.setItem("authTokens", JSON.stringify(data));
        localStorage.setItem("user", JSON.stringify(decoded));
        navigate("/");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  const signOutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
    navigate("/");
  };

  const signUpUser = async (event) => {
    event.preventDefault();
    if (event.target.password.value !== event.target.password2.value) {
      alert("Passwords do not match!");
      return;
    }
    if (4 > event.target.username.value.length > 16) {
      alert("Username must be 4-16 characters!");
      return;
    }
    if (8 > event.target.password.value.length > 16) {
      alert("Password must be 8-16 characters!");
      return;
    }
    try {
      const response = await axios.post(SIGNUP_URL, {
        username: event.target.username.value,
        email: event.target.email.value,
        password: event.target.password.value,
      });
      if (response.status === 201) {
        alert("Check your email to activate your account!");
      } else {
        alert("User could not be created!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  const updateToken = async () => {
    if (!authTokens) {
      return;
    }
    try {
      const response = await axios.post(REFRESH_TOKEN_URL, {
        refresh: authTokens?.refresh,
      });

      const data = response.data;

      if (response.status === 200) {
        setAuthTokens(data);
        let token = data.access;
        setUser(jwtDecode(token));
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        signOutUser();
      }

      if (loading) {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      signOutUser();
    }
  };

  const activateUser = async () => {
    try {
      const response = await axios.patch(ACTIVATE_URL, authHeadersConfig);
      if (response.status === 302) {
        signOutUser();
        alert("Your account has been reactivated!");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  const deactivateUser = async () => {
    try {
      const response = await axios.patch(
        DEACTIVATION_URL,
        {user_id: user.user_id},
        authHeadersConfig
      );
      if (response.status === 204) {
        signOutUser();
        alert("Your account has been deactivated!");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  useEffect(() => {
    if (loading) {
      // Call the updateToken function directly
      updateToken()
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          signOutUser();
        });
    }

    const fourMinutes = 1000 * 60 * 4;

    const interval = setInterval(() => {
      if (authTokens) {
        updateToken().catch((error) => {
          console.error(error);
          signOutUser();
        });
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  const authHeadersConfig = {
    headers: {
      Authorization: `Bearer ${authTokens?.access}`,
    },
  };

  const contextData = {
    user: user,
    authTokens: authTokens,
    signInUser: signInUser,
    signOutUser: signOutUser,
    signUpUser: signUpUser,
    activateUser: activateUser,
    deactivateUser: deactivateUser,
    updateToken: updateToken,
    authHeadersConfig: authHeadersConfig,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
