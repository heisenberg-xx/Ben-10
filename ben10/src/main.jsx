import React from "react";
import ReactDOM from "react-dom/client";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import Home from "./Pages/Home";
import { Provider } from "react-redux";
import store from "./redux/store";
import VersionDetails from "./Pages/VersionDetails";
import Alien from "./Pages/Alien";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path={`/version/:name`} element={<VersionDetails />} />
      <Route path={`alien/:name`} element={<Alien />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
