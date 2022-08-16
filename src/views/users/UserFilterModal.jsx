import { useRef, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Divider,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  DialogActions,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import BlockIcon from "@mui/icons-material/Block";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

const UserFilterModal = ({ open, handleClose }) => {
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
    alignItems: "center",
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
        <Typography variant="h5">Apply Filters</Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ color: "black", mx: 1 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent dividers>
        {/* Age Filters */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            my: 3,
            mt: 0,
          }}
        >
          <Typography variant="h6">Age</Typography>
          <Divider sx={{ my: 1, width: "75%" }} />
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Min</Box>
          <Box sx={valueStyles}>
            <TextField label="Min" color="secondary" placeholder="Min" />
          </Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Max</Box>
          <Box sx={valueStyles}>
            <TextField label="Max" color="secondary" placeholder="Max" />
          </Box>
        </Box>

        {/* Location Filters */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            my: 3,
            mt: 0,
          }}
        >
          <Typography variant="h6">Location</Typography>
          <Divider sx={{ my: 1, width: "75%" }} />
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>City</Box>
          <Box sx={valueStyles}>
            <TextField
              label="City"
              color="secondary"
              sx={{}}
              placeholder="City"
            />
          </Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>State</Box>
          <Box sx={valueStyles}>
            <TextField
              label="State"
              color="secondary"
              sx={{}}
              placeholder="State"
            />
          </Box>
        </Box>

        {/* Date Filters */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            my: 3,
            mt: 0,
          }}
        >
          <Typography variant="h6">Joining Date</Typography>
          <Divider sx={{ my: 1, width: "75%" }} />
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>From</Box>
          <Box sx={valueStyles}>
            <TextField type="date" color="secondary" placeholder="City" />
          </Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>To</Box>
          <Box sx={valueStyles}>
            <TextField type="date" color="secondary" placeholder="State" />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Apply Filters
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFilterModal;
