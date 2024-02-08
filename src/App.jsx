import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import "./css/Global.css";
import Clueless from "./pages/Clueless";
import GameOver from "./pages/GameOver";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";
import { AuthProvider } from "./context/AuthContext.jsx";
import SignOut from "./pages/SignOut.jsx";
import Confirmed from "./pages/Confirmed.jsx";
import Profile from "./pages/Profile.jsx";
import Deactivate from "./pages/Deactivate.jsx";
import Weather from "./pages/Weather.jsx";
import { QueryProvider } from "./context/QueryClient.jsx";

export default function App() {
  // const [user, setUser] = useState({ username: '', email: '' });

  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup/confirmed" element={<Confirmed />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/users" element={<Users />} />
            <Route path="/clueless" element={<Clueless />} />
            <Route path="/gameover" element={<GameOver />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/deactivate" element={<Deactivate />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </QueryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
