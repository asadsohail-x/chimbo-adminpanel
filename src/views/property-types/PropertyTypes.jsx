import { useEffect, useState, useRef } from "react";
import {
  Button,
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import {
  propertyTypesSelector,
  isLoadingSelector,
  getAsync,
  addAsync,
  updateAsync,
  delAsync,
  filter,
} from "../../redux/propertyTypes/propertyTypes.slice";

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
      <Button
        startIcon={<DeleteIcon />}
        color="error"
        onClick={() => {
          console.log("deleting");
          deleteItem();
        }}
      >
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

const PropertyTypes = () => {
  // Redux States
  const propertyTypes = useSelector(propertyTypesSelector);
  const isLoading = useSelector(isLoadingSelector);

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

  // Handle Filters

  // Add Item Preparation
  const addItem = () => {
    if (draft) {
      console.log(
        "Please finish any remaining tasks (like Editing or Adding Item)"
      );
    } else {
      console.log("Item created! Please edit and save the item");
      setNewItemName("");
      setIsNewItem(true);
    }
  };

  // Edit Item Preparation
  const editItem = (id) => {
    if (createDraft(id)) {
      console.log("Draft created! Please edit and save the item");
      setNewItemName(propertyTypes.find(({ _id }) => id === _id).name);
      setIsNewItem(false);
    } else
      console.log(
        "Please finish any remaining tasks (like Editing or Adding Item)"
      );
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
    console.log(newItemName);

    if (newItemName.trim() === "") {
      console.log("Nothing's been added");
      return;
    }

    if (isNewItem) {
      console.log("Creating");
      dispatch(addAsync(newItemName));

      setIsNewItem(false);
    } else {
      console.log("Update");
      dispatch(updateAsync(newItemName, id));

      setDraft(null);
    }
  };

  // Delete Item
  const deleteItem = (id) => {
    dispatch(delAsync(id));
    console.log("Deleting");
  };

  const handleFilters = (text) => {
    setFilterText(text);

    if (text.trim() === "") {
      dispatch(getAsync());
    }

    // Dispatch action to update the propertyTypes
    dispatch(filter(filterText));
  };

  // Markan item as being edited
  const createDraft = (id) => {
    if (draft) return false;

    setDraft(id);
    return true;
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      {isLoading && "Loading..."}

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
          {propertyTypes.map((item, index) => {
            return (
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
                    deleteItem={() => deleteItem(item._id)}
                  />
                )}
              </Box>
            );
          })}
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
          Property Types
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="secondary" variant="outlined" onClick={add}>
            Add Type
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
            placeholder="Search Type"
            variant="outlined"
          />
        </Box>
      </Box>
    </>
  );
};

export default PropertyTypes;
