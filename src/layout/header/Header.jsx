import styled from "@emotion/styled";
import { AppBar, Button, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
import { FiLogOut } from "react-icons/fi";
import { useCookies } from "react-cookie";

const HeaderRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.custom.light,
  boxShadow: theme.shadows[15],
}));

const Header = ({ onSidebarOpen, ...other }) => {
  const [,,removeCookie] = useCookies(["user"])

  const logout = () => removeCookie("user");

  return (
    <>
      <HeaderRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flex: 1 }} />
          <Button
            sx={{
              mr: 2,
              borderRadius: 1,
              color: "secondary.main",
              justifyContent: "flex-start",
              p: 1,
              textAlign: "left",
              textTransform: "none",
              "& .MuiButton-startIcon": {
                color: "secondary.main",
              },
              "&:hover": {
                backgroundColor: "rgba(255,255,255, 0.08)",
              },
            }}
            onClick={logout}
          >
            <FiLogOut size={21} />
            <span style={{ marginLeft: "8px" }}>Logout</span>
          </Button>
        </Toolbar>
      </HeaderRoot>
    </>
  );
};

export default Header;
