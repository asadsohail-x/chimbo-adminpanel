// Package Imports
import React from "react";

// Local Imports
import Layout from "./layout/Layout";
import { AppRoutes } from "./router/AppRouter";

const App = () => {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

export default App;
