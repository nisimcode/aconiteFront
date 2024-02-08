import {useContext} from "react";
import AuthContext from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

export default function SignOut() {
  const {signOutUser} = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <h2>Are you sure you want to sign out?</h2>
      <div style={{display: "flex", gap: "10px"}}>
        <Button variant={"outline-danger"} onClick={signOutUser}>
          Sign Out
        </Button>
        <Button variant={"outline-success"} onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </div>
    </>
  );
}
