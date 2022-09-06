import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
} from "../../redux/roomCharacteristics/roomCharacteristics.slice";

const EditItem = ({ name, setName, type, setType, saveItem, discardItem }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    saveItem();
  };
  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Box sx={{ width: "100%", pr: 1 }}>
        <TextField
          fullWidth
          color="secondary"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Name"
          variant="outlined"
          sx={{ m: 1 }}
        />
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel color="secondary" id="demo-simple-select-label">
            Type
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            color="secondary"
            onChange={({ target: { value } }) => setType(value)}
          >
            <MenuItem value="STRING">String (Text)</MenuItem>
            <MenuItem value="NUMBER">Number</MenuItem>
            <MenuItem value="BOOLEAN">Boolean (True/False)</MenuItem>
          </Select>
        </FormControl>
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

const Item = ({ item: { name, type, _id }, editItem, deleteItem }) => {
  let itemType = "";

  switch (type) {
    case "STRING":
      itemType = "String (Text)";
      break;
    case "NUMBER":
      itemType = "Number";
      break;
    case "BOOLEAN":
      itemType = "Boolean (True/False)";
      break;
    default: break;
  }
  return (
    <>
      <Box sx={{ flexGrow: 1, pr: 1 }}>{name}</Box>
      <Box sx={{ pr: 1, fontWeight: "lighter" }}>
        <i>{itemType}</i>
      </Box>
      <div>
        <Button startIcon={<DeleteIcon />} color="error" onClick={deleteItem}>
          Delete
        </Button>
        <Button
          startIcon={<EditIcon />}
          onClick={() => editItem(_id)}
          color="info"
        >
          Edit
        </Button>
      </div>
    </>
  );
};

const Modal = ({ open, handleClose, submit }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Room Characteristic?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you choose to delete the room characteristic, all the Users with the
          specified room characteristic will be removed. Are you sure you want to
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

const RoomCharacteristics = () => {
  // Redux States
  const roomCharacteristics = useSelector(
    (state) => state.roomCharacteristics.roomCharacteristics
  );
  const isLoading = useSelector((state) => state.roomCharacteristics.isLoading);
  // const error = useSelector((state) => state.roomCharacteristics.error);

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
  const [newItemType, setNewItemType] = useState("");
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
      setNewItemType("");
      setIsNewItem(true);
    }
  };

  // Edit Item Preparation
  const editItem = (id) => {
    if (createDraft(id)) {
      const { name, type } = roomCharacteristics.find(({ _id }) => id === _id);
      setNewItemName(name);
      setNewItemType(type);
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

    if (newItemType.trim() === "") {
      console.log("No Type Selected");
      return;
    }

    if (isNewItem) {
      dispatch(addAsync(newItemName, newItemType));

      setIsNewItem(false);
    } else {
      dispatch(updateAsync(newItemName, newItemType, id));

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
              type={newItemType}
              setType={setNewItemType}
              saveItem={() => saveItem()}
              discardItem={() => setIsNewItem(false)}
            />
          )}
          {roomCharacteristics.length > 0
            ? roomCharacteristics.map((item, index) => (
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
                      type={newItemType}
                      setType={setNewItemType}
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
            : !isNewItem && <NoItems name="Room Characteristics" />}
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
          Room Characteristics
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

export default RoomCharacteristics;
