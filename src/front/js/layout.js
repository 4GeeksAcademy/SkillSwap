import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/ScrollToTop";
import { BackendURL } from "./component/backendURL";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

import { ProtectedRoute } from "./component/ProtectedRoute";
import { Home } from "./pages/home";
import { SignUp } from "./pages/signup";
import { UserCard } from "./pages/usercard";
import { MyAccount } from "./pages/my-account";
import { Chat } from "./pages/chat";
import { About } from "./pages/about";
import Login from "./pages/login";
import Pricing from "./pages/pricing";
import injectContext from "./store/appContext";
import { UserProfile } from "./pages/userprofile";

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
            <Route element={<Home />} path="/" />
            <Route
              element={
                <ProtectedRoute>
                  <UserCard />
                </ProtectedRoute>
              }
              path="/UserCard"
            />
            <Route
              element={
                <ProtectedRoute>
                  <MyAccount />
                </ProtectedRoute>
              }
              path="/my-account"
            />
            <Route
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
              path="/Chat"
            />
            <Route element={<UserProfile />} path="/user/:id" />
            <Route element={<About />} path="/About" />
            <Route element={<SignUp />} path="/SignUp" />
            <Route element={<Login />} path="/login" />
            <Route element={<Pricing />} path="/pricing" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
        </ScrollToTop>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
