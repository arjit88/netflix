import { onAuthStateChanged } from "firebase/auth";
import "./App.css";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import { auth } from "./config/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate("/");
      } else {
        navigate("/authpage");
      }
    });
  }, []);

  return (
    <div className="app">
      <HomeScreen />
    </div>
  );
}

export default App;
