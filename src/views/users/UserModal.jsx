import { useRef, useEffect } from "react";
import {
  Avatar,
  Button,
  Box,
  Divider,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import BlockIcon from "@mui/icons-material/Block";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

const UserModal = ({ open, handleClose }) => {
  const modalContentRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: modalContent } = modalContentRef;
      if (modalContent !== null) {
        modalContent.focus();
      }
    }
  }, [open]);

  const rowStyles = {
    m: 1,
    my: 2,
    display: "flex",
    alignItems: "flex-start",
  };
  const labelStyles = {
    minWidth: "210px",
    maxWidth: "210px",
    mr: 1,
    textAlign: "left",
    opacity: "0.75",
  };
  const valueStyles = {
    fontSize: "18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
        id="scroll-dialog-title"
      >
        <Typography variant="h5">User Details</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            sx={{ mx: 1, color: (theme) => theme.palette.warning.main }}
          >
            <BlockIcon />
          </IconButton>
          <IconButton color="error" sx={{ mx: 1 }}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ color: "black", mx: 1 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <DialogContent dividers>
        {/* User Profile Photo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            m: 3,
          }}
        >
          <Avatar
            sx={{
              color: (theme) => theme.palette.secondary.main,
              background: "white",
              boxShadow: (theme) => theme.shadows[20],
              width: 100,
              height: 100,
            }}
          >
            <img
              src="https://imgs.search.brave.com/EYJQep7dVZIorOyuvBoKX4Km39jdpZQBHh4I6vrYEOg/rs:fit:256:256:1/g:ce/aHR0cHM6Ly9jZG4y/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvcGljb25zLWJh/c2ljLTIvNTcvYmFz/aWMyLTEwM191c2Vy/X3Blb3BsZV9tYW4t/MjU2LnBuZw"
              alt="U"
              width="100%"
            />
          </Avatar>
        </Box>

        {/* User Information */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            my: 3,
            mt: 0,
          }}
        >
          <Divider sx={{ my: 1, width: "20%" }} />
          <Typography variant="h6">User Information</Typography>
          <Divider sx={{ my: 1, width: "20%" }} />
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Name</Box>
          <Box sx={valueStyles}>John Doe</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Email</Box>
          <Box sx={valueStyles}>john.doe@mail.com</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Gender</Box>
          <Box sx={valueStyles}>Male</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Phone No.</Box>
          <Box sx={valueStyles}>051 123 123 051</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Address</Box>
          <Box sx={valueStyles}>Gotham, USA</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Description.</Box>
          <Box sx={valueStyles}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo,
            quod debitis iure temporibus assumenda eaque odio architecto officia
          </Box>
        </Box>
        <Box sx={{ ...rowStyles, alignItems: "center" }}>
          <Box sx={labelStyles}>No. of Posts</Box>
          <Box sx={valueStyles}>
            <Button sx={{ color: (theme) => theme.palette.info.main }}>
              100 Posts
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
