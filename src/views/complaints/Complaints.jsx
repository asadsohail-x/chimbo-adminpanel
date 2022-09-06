import { useState, Fragment } from "react";
import {
  Button,
  Box,
  Container,
  Card,
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
import UserModal from "../users/UserModal";
import ListingModal from "../listings/ListingModal";

const ComplaintsTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [listingModalOpen, setListingModalOpen] = useState(false);

  return (
    <Card>
      <UserModal open={modalOpen} handleClose={() => setModalOpen(false)} />
      <ListingModal
        open={listingModalOpen}
        handleClose={() => setListingModalOpen(false)}
      />
      <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ minWidth: 768 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Complaint Type</TableCell>
                <TableCell>Posted By</TableCell>
                <TableCell>Posted Against</TableCell>
                <TableCell>Posted On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell>1</TableCell>
                <TableCell>User misbehaviour?</TableCell>
                <TableCell>User Complaint</TableCell>
                <TableCell>
                  <Button color="secondary" onClick={() => setModalOpen(true)}>
                    John Doe
                  </Button>
                </TableCell>
                <TableCell>
                  <Button color="error" onClick={() => setModalOpen(true)}>
                    John Doe
                  </Button>
                </TableCell>
                <TableCell>Tue Aug 16 2022 06:49:44</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>1</TableCell>
                <TableCell>Inappropriate Listing</TableCell>
                <TableCell>Listing Report</TableCell>
                <TableCell>
                  <Button color="secondary" onClick={() => setModalOpen(true)}>
                    John Doe
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => setListingModalOpen(true)}
                  >
                    Listing#123
                  </Button>
                </TableCell>
                <TableCell>Tue Aug 16 2022 06:49:44</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>1</TableCell>
                <TableCell>Listing Under Review</TableCell>
                <TableCell>Listing Flag</TableCell>
                <TableCell>
                  <Button color="secondary" onClick={() => setModalOpen(true)}>
                    John Doe
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => setListingModalOpen(true)}
                  >
                    Listing#123
                  </Button>
                </TableCell>
                <TableCell>Tue Aug 16 2022 06:49:44</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Card>
  );
};

const Complaints = () => {
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
        <ComplaintsTable
          complaints={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
        />
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
          Complaints
        </Typography>
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
      </Box>
    </>
  );
};

export default Complaints;
