import { useRef, useState, useEffect, Fragment } from "react";
import {
  Button,
  Box,
  Container,
  Card,
  Divider,
  Dialog,
  ImageList,
  DialogContent,
  IconButton,
  ImageListItem,
  TextField,
  InputAdornment,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from "@mui/icons-material/Flag";
import DeleteIcon from "@mui/icons-material/Delete";
import ListingModal from './ListingModal';

const ListingsTable = ({ listings }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Card>
      <ListingModal open={modalOpen} handleClose={() => setModalOpen(false)} />
      <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ minWidth: 768 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Posted By</TableCell>
                <TableCell>Posted On</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listings.map((item, i) => (
                <TableRow hover key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>Street 7A, NY</TableCell>
                  <TableCell>99.99$</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Tue Aug 16 2022 06:49:44</TableCell>
                  <TableCell>
                    <Button
                      startIcon={<VisibilityIcon />}
                      color="secondary"
                      onClick={() => setModalOpen(true)}
                    >
                      View More
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Card>
  );
};

const Listings = () => {
  const [filterText, setFilterText] = useState("");
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container style={{ maxWidth: 1000 }}>
        <Toolbar
          add={() => console.log("add")}
          filterText={filterText}
          setFilterText={setFilterText}
        />
        <ListingsTable listings={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]} />
      </Container>
    </Box>
  );
};

const Toolbar = ({ add, filterText, setFilterText }) => {
  return (
    <>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Listings
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="secondary" variant="contained" onClick={add}>
            Add
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3, display: "flex", alignItems: "center" }}>
        <Box sx={{ maxWidth: 500, my: 5, mr: 2 }}>
          <TextField
            fullWidth
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon color="action" fontSize="small">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search"
            variant="outlined"
          />
        </Box>
        {/* <Button color="secondary" variant="outlined" onClick={add}>
          Filters
        </Button> */}
      </Box>
    </>
  );
};

export default Listings;
