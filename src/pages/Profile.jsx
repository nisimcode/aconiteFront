import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {PROFILE_URL} from "../utils/url.js";
import AuthContext from "../context/AuthContext.jsx";
import moment from "moment";
import {Link} from "react-router-dom";


export default function Profile() {
  const {authHeadersConfig} = useContext(AuthContext);
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get(PROFILE_URL, authHeadersConfig)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        }
      })
      .catch((error) => {
        alert("Something went wrong!");
        console.log(error)
      });
  }, []);

  const calculateDuration = () => {
    // Given time in the specified format
    const givenTime = user["date_joined"];
    // Convert the given time to a moment object
    const givenMoment = moment(givenTime);
    // Get the current moment
    const currentMoment = moment();
    // Calculate the time difference
    const timeDifference = moment.duration(currentMoment.diff(givenMoment));
    // Humanize the time difference
    const humanizedTimeDifference = moment
      .duration(timeDifference.asMilliseconds())
      .humanize();

    return humanizedTimeDifference;
  };


  console.log(user);
  return (
    <>
      <h3>Username: {user.username}</h3>
      <h3>Email: {user.email}</h3>
      <h3>First name: {user.first_name}</h3>
      <h3>Last name: {user.last_name}</h3>
      <h3>Member for: {calculateDuration()}</h3>
      <Link to="/profile/deactivate">Deactivate account</Link>
    </>
  );
}
