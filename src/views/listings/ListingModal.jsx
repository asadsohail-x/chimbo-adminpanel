import { useRef, useEffect, Fragment } from "react";
import {
  Box,
  Divider,
  Dialog,
  ImageList,
  DialogContent,
  IconButton,
  ImageListItem,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from "@mui/icons-material/Flag";
import DeleteIcon from "@mui/icons-material/Delete";

const ListingModal = ({ open, handleClose }) => {
  const modalContentRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: modalContent } = modalContentRef;
      if (modalContent !== null) {
        modalContent.focus();
      }
    }
  }, [open]);
  const rowStyles = { m: 1, my: 2, display: "flex", alignItems: "flex-start" };
  const labelStyles = {
    minWidth: "210px",
    maxWidth: "210px",
    mr: 1,
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
        <Typography variant="h5">Listing Details</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            sx={{ mx: 1, color: (theme) => theme.palette.warning.main }}
          >
            <FlagIcon />
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
        {/* Property Information */}
        <Box sx={{ display: "flex", alignItems: "center", my: 3, mt: 0 }}>
          <Typography variant="h6" sx={{ width: "100%", display: "inline" }}>
            Property Information
          </Typography>
          <Divider sx={{ my: 1, width: "40%" }} />
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Listing Type</Box>
          <Box sx={valueStyles}>Shared</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Property Type</Box>
          <Box sx={valueStyles}>Room</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Heating Type</Box>
          <Box sx={valueStyles}>Blowers</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>City</Box>
          <Box sx={valueStyles}>New York</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Street Name</Box>
          <Box sx={valueStyles}>Groove Street</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Street No</Box>
          <Box sx={valueStyles}>33</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Price</Box>
          <Box sx={valueStyles}>99.99$</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Room Shared With</Box>
          <Box sx={valueStyles}>3 People</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Current Residents</Box>
          <Box sx={valueStyles}>3</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Is Owner Living in Property?</Box>
          <Box sx={valueStyles}>Yes</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Gender Preference</Box>
          <Box sx={valueStyles}>Male</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Minimum Stay</Box>
          <Box sx={valueStyles}>5 days</Box>
        </Box>

        {/* Specifications */}
        <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Typography variant="h6" sx={{ width: "100%", display: "inline" }}>
            Specifications
          </Typography>
          <Divider sx={{ my: 1, width: "40%" }} />
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Beds</Box>
          <Box sx={valueStyles}>2</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Rooms</Box>
          <Box sx={valueStyles}>1</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Area per sq. ft.</Box>
          <Box sx={valueStyles}>300</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Furnished</Box>
          <Box sx={valueStyles}>Yes</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Description Notes</Box>
          <Box sx={valueStyles}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo,
            quod debitis iure temporibus assumenda eaque odio architecto officia
            mollitia, commodi laboriosam dolores nihil consequuntur porro hic
            autem magnam voluptate ut?
          </Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Pets Allowed</Box>
          <Box sx={valueStyles}>Yes</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Smokers Allowed</Box>
          <Box sx={valueStyles}>No</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Lift</Box>
          <Box sx={valueStyles}>No</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Couples Allowed</Box>
          <Box sx={valueStyles}>No</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Private Toilet</Box>
          <Box sx={valueStyles}>No</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Minors Allowed</Box>
          <Box sx={valueStyles}>No</Box>
        </Box>

        {/* Room Characteristics */}
        <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Typography variant="h6" sx={{ width: "100%", display: "inline" }}>
            Room Characteristics
          </Typography>
          <Divider sx={{ my: 1, width: "40%" }} />
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Lift</Box>
          <Box sx={valueStyles}>No</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Accessible Property</Box>
          <Box sx={valueStyles}>Yes</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Cleaning Services</Box>
          <Box sx={valueStyles}>Yes</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Garden</Box>
          <Box sx={valueStyles}>Yes</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Pool</Box>
          <Box sx={valueStyles}>No</Box>
        </Box>

        {/* Features */}
        <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Typography variant="h6" sx={{ width: "100%", display: "inline" }}>
            Features
          </Typography>
          <Divider sx={{ my: 1, width: "40%" }} />
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Watch Man</Box>
          <Box sx={valueStyles}>Yes</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Gardener</Box>
          <Box sx={valueStyles}>Yes</Box>
        </Box>

        {/* Accessibility */}
        <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Typography variant="h6" sx={{ width: "100%", display: "inline" }}>
            Accessibility
          </Typography>
          <Divider sx={{ my: 1, width: "40%" }} />
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>
            The exterior access to the property has been adapted for wheelchair
            use (the property has ramps and a lift with a capacity of 6 people
            or the property is at street level without kerbs)
          </Box>
          <Box sx={valueStyles}>Yes</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>
            The interior of the property has been adapted for wheelchair use (it
            has wide doors and corridors, handrails, non-slip floors,…)
          </Box>
          <Box sx={valueStyles}>No</Box>
        </Box>

        {/* Posting Information */}
        <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Typography variant="h6" sx={{ width: "100%", display: "inline" }}>
            Posting Information
          </Typography>
          <Divider sx={{ my: 1, width: "40%" }} />
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Posted By</Box>
          <Box sx={valueStyles}>John Doe</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Available From</Box>
          <Box sx={valueStyles}>Tue Aug 16 2022 06:49:44</Box>
        </Box>
        <Box sx={rowStyles}>
          <Box sx={labelStyles}>Posted On</Box>
          <Box sx={valueStyles}>Tue Aug 16 2022 06:49:44</Box>
        </Box>

        {/* Listing Images */}
        <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Typography variant="h6" sx={{ width: "100%", display: "inline" }}>
            Listing Images
          </Typography>
          <Divider sx={{ my: 1, width: "40%" }} />
        </Box>
        <Box sx={rowStyles}>
          <ImageList sx={{ width: "100%", height: "100%" }} cols={1}>
            {[
              "https://imgs.search.brave.com/HOdwH8cotukVfPJl7FrxAxkhaG_zKsZaNpoN9xX-vdo/rs:fit:1200:957:1/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vei90ZW1w/b3JhcnktaG91c2lu/Zy0xNTEyOTA5OS5q/cGc",
            ].map((image, i) => (
              <Fragment key={i}>
                <ImageListItem>
                  <img
                    src={image}
                    srcSet={`${image} 2x`}
                    alt="Property"
                    loading="lazy"
                  />
                </ImageListItem>
                <ImageListItem>
                  <img
                    src={image}
                    srcSet={`${image} 2x`}
                    alt="Property"
                    loading="lazy"
                  />
                </ImageListItem>
                <ImageListItem>
                  <img
                    src={image}
                    srcSet={`${image} 2x`}
                    alt="Property"
                    loading="lazy"
                  />
                </ImageListItem>
              </Fragment>
            ))}
          </ImageList>
        </Box>

        {/* Listing Videos */}
        <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Typography variant="h6" sx={{ width: "100%", display: "inline" }}>
            Listing Videos
          </Typography>
          <Divider sx={{ my: 1, width: "40%" }} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ListingModal;
