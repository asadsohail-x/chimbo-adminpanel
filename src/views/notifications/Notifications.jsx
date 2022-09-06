import { useState, Fragment } from "react";
import {
  Button,
  Box,
  Container,
  Card,
  Avatar,
  TextField,
  InputAdornment,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const ComplaintsTable = () => {
  return (
    <Card>
      <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ minWidth: 768 }}>
          <Table>
            <TableBody>
              <TableRow hover>
                <TableCell>
                  <Avatar
                    sx={{
                      color: (theme) => theme.palette.secondary.main,
                      background: "white",
                      boxShadow: (theme) => theme.shadows[20],
                    }}
                  >
                    <NotificationsNoneIcon />
                  </Avatar>
                </TableCell>
                <TableCell
                  sx={{
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box sx={{ fontSize: "18px" }}>Notification Text</Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <i>User Notifications</i>
                      <Box>06:49 16/08/2022</Box>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Button startIcon={<DeleteIcon />} color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  <Avatar
                    sx={{
                      color: (theme) => theme.palette.secondary.main,
                      background: "white",
                      boxShadow: (theme) => theme.shadows[20],
                    }}
                  >
                    <img
                      src="https://imgs.search.brave.com/EYJQep7dVZIorOyuvBoKX4Km39jdpZQBHh4I6vrYEOg/rs:fit:256:256:1/g:ce/aHR0cHM6Ly9jZG4y/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvcGljb25zLWJh/c2ljLTIvNTcvYmFz/aWMyLTEwM191c2Vy/X3Blb3BsZV9tYW4t/MjU2LnBuZw"
                      alt="U"
                      width="100%"
                    />
                  </Avatar>
                </TableCell>
                <TableCell
                  sx={{
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box sx={{ fontSize: "18px" }}>
                      User created a new account
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <i>User Notifications</i>
                      <Box>06:49 16/08/2022</Box>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Button startIcon={<DeleteIcon />} color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  <Avatar
                    sx={{
                      color: (theme) => theme.palette.secondary.main,
                      background: "white",
                      boxShadow: (theme) => theme.shadows[20],
                    }}
                  >
                    <NotificationsNoneIcon />
                  </Avatar>
                </TableCell>
                <TableCell
                  sx={{
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box sx={{ fontSize: "18px" }}>Notification Text</Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <i>User Notifications</i>
                      <Box>06:49 16/08/2022</Box>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Button startIcon={<DeleteIcon />} color="error">
                    Delete
                  </Button>
                </TableCell>
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
        <Toolbar filterText={filterText} setFilterText={setFilterText} />
        <ComplaintsTable
          complaints={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
        />
      </Container>
    </Box>
  );
};

const Toolbar = ({ filterText, setFilterText }) => {
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
