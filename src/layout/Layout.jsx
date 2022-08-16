import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

const Layout = ({ children, logout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <LayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
            p: 1,
          }}
        >
          {children}
        </Box>
      </LayoutRoot>
      <Header logout={logout} onSidebarOpen={() => setSidebarOpen(true)} />
      <Sidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </>
  );
};

export default Layout;
