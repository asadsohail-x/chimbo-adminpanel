import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  SvgIcon,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import {
  getAsync,
  addAsync,
  updateAsync,
  delAsync,
  filter,
} from "../../redux/heatingTypes/heatingTypes.slice";

const EditItem = ({ name, setName, saveItem, discardItem }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    saveItem();
  };
  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Box sx={{ flexGrow: 1, pr: 1 }}>
        <TextField
          fullWidth
          color="secondary"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Name"
          variant="outlined"
        />
      </Box>
      <Box sx={{ width: "100%", justifyContent: "flex-end" }}>
        <Button startIcon={<DeleteIcon />} onClick={discardItem} color="error">
          Discard
        </Button>
        <Button startIcon={<SaveIcon />} type="submit" color="secondary">
          Save
        </Button>
      </Box>
    </form>
  );
};

const Item = ({ item, editItem, deleteItem }) => (
  <>
    <Box sx={{ flexGrow: 1, pr: 1 }}>{item.name}</Box>
    <div>
      <Button startIcon={<DeleteIcon />} color="error" onClick={deleteItem}>
        Delete
      </Button>
      <Button
        startIcon={<EditIcon />}
        onClick={() => editItem(item._id)}
        color="info"
      >
        Edit
      </Button>
    </div>
  </>
);

const Modal = ({ open, handleClose, submit }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Heating Type?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you choose to delete the Heating Type, all the Listings with the
          specified heating type will be removed. Are you sure you want to
          proceed?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "black" }}>
          Cancel
        </Button>
        <Button onClick={submit} autoFocus color="secondary">
          Proceed to Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const HeatingTypes = () => {
  // Redux States
  const heatingTypes = useSelector((state) => state.heatingTypes.heatingTypes);
  const isLoading = useSelector((state) => state.heatingTypes.isLoading);

  // Redux Dispatch
  const dispatch = useDispatch();

  // Caling Get API on first render
  useEffect(() => {
    dispatch(getAsync());
  }, [dispatch]);

  // Component Local States
  const [draft, setDraft] = useState(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Add Item Preparation
  const addItem = () => {
    if (draft) {
      // TODO: Add an alert message here
      console.log(
        "Please finish any remaining tasks (like Editing or Adding Item)"
      );
    } else {
      setNewItemName("");
      setIsNewItem(true);
    }
  };

  // Edit Item Preparation
  const editItem = (id) => {
    if (createDraft(id)) {
      setNewItemName(heatingTypes.find(({ _id }) => id === _id).name);
      setIsNewItem(false);
    } else {
      // TODO: Add an alert message here
      console.log(
        "Please finish any remaining tasks (like Editing or Adding Item)"
      );
    }
  };

  // Discard when editing or adding
  const discardItem = (id) => {
    if (isNewItem) setIsNewItem(false);

    if (!draft) return;
    if (draft !== id) return;

    setDraft(null);
  };

  // Save Item at the end of editing and creating
  const saveItem = (id = null) => {
    if (newItemName.trim() === "") {
      // TODO: Add an alert message here
      console.log("Nothing's been added");
      return;
    }

    if (isNewItem) {
      dispatch(addAsync(newItemName));

      setIsNewItem(false);
    } else {
      dispatch(updateAsync(newItemName, id));

      setDraft(null);
    }
  };

  const handleOpen = (id) => {
    setDeleteId(id);
    setOpenModal(true);
  };

  // Delete Item
  const deleteItem = (id) => {
    setOpenModal(false);
    dispatch(delAsync(id));
  };

  const handleFilters = (text) => {
    setFilterText(text);

    dispatch(filter(text.trim()));
  };

  // Markan item as being edited
  const createDraft = (id) => {
    if (draft) return false;

    setDraft(id);
    return true;
  };

  if (isLoading)
    return (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h6">
          Loading
        </Typography>
        <CircularProgress color="secondary" />
      </Box>
    );

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Modal
        open={isModalOpen}
        handleClose={() => setOpenModal(false)}
        submit={() => deleteItem(deleteId)}
      />
      <Container style={{ maxWidth: 1000 }}>
        <Toolbar
          add={addItem}
          filterText={filterText}
          setFilterText={handleFilters}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          {isNewItem && (
            <EditItem
              name={newItemName}
              setName={setNewItemName}
              saveItem={() => saveItem()}
              discardItem={() => setIsNewItem(false)}
            />
          )}
          {heatingTypes.length > 0
            ? heatingTypes.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 1,
                    my: "2px",
                    border: draft === item._id || "1px solid #eaeaea",
                  }}
                >
                  {draft === item._id ? (
                    <EditItem
                      name={newItemName}
                      setName={setNewItemName}
                      saveItem={() => saveItem(item._id)}
                      discardItem={() => discardItem(item._id)}
                    />
                  ) : (
                    <Item
                      item={item}
                      editItem={editItem}
                      deleteItem={() => handleOpen(item._id)}
                    />
                  )}
                </Box>
              ))
            : !isNewItem && <NoItems name="Heating Types" />}
        </Box>
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
          Heating Types
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="secondary" variant="contained" onClick={add}>
            Add
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box sx={{ maxWidth: 500, my: 5 }}>
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

const NoItems = ({ name }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">No {name} found</Typography>
      <br />
      <p>Create one by clicking the Add button above.</p>
    </Box>
  );
};

export default HeatingTypes;
