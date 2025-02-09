import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/ScrollToTop";
import { BackendURL } from "./component/backendURL";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

import { ProtectedRoute } from "./component/ProtectedRoute";
import { Home } from "./pages/home";
import { SignUp } from "./pages/SignUp";
import { UserCard } from "./pages/UserCard";
import { PrivateSpace } from "./pages/PrivateSpace";
import { Chat } from "./pages/Chat";
import { About } from "./pages/About";
import Login from "./pages/login";
import Pricing from "./pages/pricing";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <Navbar />
        <ScrollToTop>
          <Routes>
            <Route
              path="/pricing"
              element={
                <ProtectedRoute>
                  <Pricing />
                </ProtectedRoute>
              }
            />
            <Route element={<Home />} path="/" />
            <Route element={<SignUp />} path="/SignUp" />
            <Route element={<UserCard />} path="/UserCard" />
            <Route element={<PrivateSpace />} path="/PrivateSpace" />
            <Route element={<Chat />} path="/Chat" />
            <Route element={<About />} path="/About" />
            <Route element={<Login />} path="/login" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Pricing />} path="/pricing" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
        </ScrollToTop>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
