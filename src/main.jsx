import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./features/store.js";
import ErrorPage from "./ErrorPage.jsx";
import Login from "./Pages/Login/Login.jsx";
import AuthPage from "./Pages/AuthPage/AuthPage.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Player from "./Pages/Player/Player.jsx";
import MovieDescription from "./components/MovieDescription/MovieDescription.jsx";
import Search from "./Pages/Search/Search.jsx";
import TvShows from "./Pages/TvShows/TvShows.jsx";
import Movies from "./Pages/Movies/Movies.jsx";
import Popular from "./Pages/NewAndPopular/Popular.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/authpage",
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/player/:id",
    element: <Player />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/movieDescription/:id",
    element: <MovieDescription />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tvshows",
    element: <TvShows />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/movies",
    element: <Movies />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/popular",
    element: <Popular />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search",
    element: <Search />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer theme="dark" />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
