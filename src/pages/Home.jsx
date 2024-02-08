import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  const renderMessage = () => {
    if (user) {
      return <h1>Welcome to Aconite, {user.username}!</h1>;
    } else {
      return (
        <div>
          <h1>Welcome to Aconite.</h1>
          <br />
          <h1>Sign in to get started!</h1>
        </div>
      );
    }
  };

  return renderMessage();
}
