import {useContext} from "react";
import AuthContext from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export default function Deactivate() {
  const {deactivateUser} = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      <h2>Are you sure you want to deactivate your profile? </h2>
      <h3>(You will have 14 days to reactivate, after which your profile will be deleted)</h3>
      <button onClick={deactivateUser}>Deactivate</button>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  )
}