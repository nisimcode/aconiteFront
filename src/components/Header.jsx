import { Link } from "react-router-dom";
import { ACONITE_COLOR } from "../utils/defaultValues";
import AuthContext from "../context/AuthContext.jsx";
import { useContext } from "react";

export default function Header() {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex-container flex-column">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            style={{ color: ACONITE_COLOR, fontWeight: "bold" }}
          >
            Aconite
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to={user ? "/signout" : "/signin"}>
                  {user ? `Sign out (${user.username})` : "Sign in"}
                </Link>
              </li>
              {user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/weather">
                      Weather
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
