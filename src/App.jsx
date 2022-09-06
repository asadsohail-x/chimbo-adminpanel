// Package Imports
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

// Local Imports
import Layout from "./layout/Layout";
import Loader from "./Loader";
import Login from "./views/login/Login";
import { AuthenticatedRoutes } from "./router/AppRouter";

import { set as setAdmin } from "./redux/admin/admin.slice";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const [cookie, , removeCookie] = useCookies(["user"]);

  const dispatch = useDispatch();

  const adminLoggedIn = useSelector((state) => state.admin.isLoggedIn);

  useEffect(() => {
    setLoggedIn(adminLoggedIn);
  }, [adminLoggedIn]);

  useEffect(() => {
    const user = cookie["user"];
    if (user) {
      if (!isLoggedIn) {
        if (user.token) {
          const data = JSON.parse(JSON.stringify(user));
          delete data.loggedIn;

          setLoggedIn(false);
          dispatch(setAdmin(data));
          setTimeout(() => setLoading(false), 500);

          return;
        }
      } else {
        setLoggedIn(() => true);
        setTimeout(() => setLoading(false), 500);
        return;
      }
    }

    setLoggedIn(() => false);
    removeCookie("user");
    setTimeout(() => setLoading(false), 500);
  }, [cookie, dispatch, isLoggedIn, removeCookie]);

  return isLoading ? (
    <Loader />
  ) : isLoggedIn ? (
    <Layout>
      <AuthenticatedRoutes />
    </Layout>
  ) : (
    <Login />
  );
};

export default App;
