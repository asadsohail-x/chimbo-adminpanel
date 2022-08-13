import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Box, Divider, Button, Drawer, useMediaQuery } from "@mui/material";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { routes } from "../../router/AppRouter";
import Logo from "../../assets/logo.png";

const ListItemBody = ({ config }) => {
  const { icon, title } = config;

  return (
    <>
      {icon !== null && icon}
      <ListItemText style={{ marginLeft: "20px" }} primary={title} />
    </>
  );
};

const NavButton = ({ active = false, children, ...rest }) => (
  <Button
    sx={{
      backgroundColor: active ? "custom.accent" : "custom.light",
      borderRadius: 1,
      color: active ? "custom.light" : "custom.dark",
      fontWeight: active && "fontWeightBold",
      justifyContent: "flex-start",
      px: 3,
      mt: 1,
      textAlign: "left",
      textTransform: "none",
      width: "100%",
      "& .MuiButton-startIcon": {
        color: active ? "secondary.main" : "neutral.400",
      },
      "&:hover": {
        backgroundColor: "custom.light",
        color: "custom.accent",
      },
    }}
    {...rest}
  >
    {children}
  </Button>
);

const MenuItem = ({ config }) => {
  const location = useLocation();
  const active = location.pathname === config.path;

  return (
    <NavLink to={config.path}>
      <NavButton active={active}>
        <ListItemBody config={config} />
      </NavButton>
    </NavLink>
  );
};

const ExpandableMenuItem = ({ config }) => {
  const [open, setOpen] = useState(false);

  return (
    <div component="nav">
      <NavButton onClick={() => setOpen(!open)}>
        <ListItemBody config={config} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </NavButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Menu routes={config.children} />
      </Collapse>
    </div>
  );
};

const Menu = ({ routes }) => {
  const createList = (routes) => {
    let menu = [];
    routes.forEach((menuItem, key) => {
      if (menuItem.children) {
        menu.push(<ExpandableMenuItem config={menuItem} key={key} />);
      } else {
        menu.push(<MenuItem config={menuItem} key={key} />);
      }
    });
    return menu.concat();
  };

  return <List>{createList(routes)}</List>;
};

const SidebarContent = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      p: 1,
    }}
  >
    <Box sx={{ p: 3 }}>
      <NavLink
        to="/"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Logo} alt="Logo" style={{ width: "125px" }} />
      </NavLink>
    </Box>
    <Divider
      sx={{
        borderColor: "custom.accent",
        mb: 3,
      }}
    />
    <Box sx={{ flexGrow: 1 }}>
      <Menu routes={routes} />
    </Box>
  </Box>
);

const Sidebar = ({ open, onClose }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "custom.light",
            color: "#FFFFFF",
            width: 280,
            boxShadow: "3px 0 15px -10px black",
          },
        }}
        variant="permanent"
      >
        <SidebarContent />
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "custom.light",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      <SidebarContent />
    </Drawer>
  );
};

export default Sidebar;
