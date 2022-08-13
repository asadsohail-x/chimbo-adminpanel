import { useState } from "react";
import {
  Avatar,
  Button,
  Box,
  Container,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import BlockIcon from "@mui/icons-material/Block";

const UsersTable = ({ users, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = users.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ minWidth: 768 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === 10}
                    color="secondary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < users.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone No</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                hover
                selected={selectedCustomerIds.indexOf("123") !== -1}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.indexOf("123") !== -1}
                    color="secondary"
                    onChange={(event) => handleSelectOne(event, "123")}
                    value="true"
                  />
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Avatar src="" sx={{ mr: 2 }}>
                      {getInitials("User")}
                    </Avatar>
                    <Typography color="textPrimary" variant="body1">
                      User
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>user@email.com</TableCell>
                <TableCell>phone</TableCell>
                <TableCell>
                  <Button startIcon={<BlockIcon />} color="error">
                    Block
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        <TablePagination
          component="div"
          count={10}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            overflow: "visible",
          }}
        />
      </Box>
    </Card>
  );
};

const Users = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Typography sx={{ mb: 3 }} variant="h4">
          Users
        </Typography>
        <UsersTable users={[]} />
      </Container>
    </Box>
  );
};

export default Users;
