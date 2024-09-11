import { onAuthStateChanged } from "firebase/auth";
import "./App.css";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import { auth } from "./config/firebase";
import { useEffect } from "react";
import AuthPage from "./Pages/AuthPage/AuthPage";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut, selectUser } from "./features/userSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          logIn({
            uid: auth.uid,
            email: auth.email,
          })
        );
        navigate("/");
      } else {
        dispatch(logOut());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return <div className="app">{!user ? <AuthPage /> : <HomeScreen />}</div>;
}

export default App;
