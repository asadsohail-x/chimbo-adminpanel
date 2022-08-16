// Package Imports
import { useState } from "react";

// Local Imports
import Layout from "./layout/Layout";
import Login from "./views/login/Login";
import { AuthenticatedRoutes } from "./router/AppRouter";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  if (isLoggedIn) {
    return (
      <Layout logout={() => setLoggedIn(false)}>
        <AuthenticatedRoutes />
      </Layout>
    );
  }

  return <Login login={() => setLoggedIn(true)} />;
};

export default App;
