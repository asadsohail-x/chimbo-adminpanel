import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

import { updatePasswordAsync } from "../../redux/admin/admin.slice";
import { toast } from "react-toastify";

import Loader from "../../Loader";

const PasswordUpdate = (props) => {
  const [cookie] = useCookies(["user"]);
  const dispatch = useDispatch();

  const message = useSelector((state) => state.admin.message);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const error = useSelector((state) => state.admin.error);

  const [values, setValues] = useState({
    prevPassword: "",
    password: "",
    confirm: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    const user = cookie["user"];

    if (user) {
      const id = user._id;

      dispatch(updatePasswordAsync(id, values.prevPassword, values.password));
    }
  };

  useEffect(() => {
    if (!isLoading && message) {
      if (!error) {
        toast.success(message);
        setValues({ ...values, prevPassword: "", password: "" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  if (isLoading) return <Loader />;

  return (
    <form {...props}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Previous Password"
            margin="normal"
            color="secondary"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.previousPassword}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            color="secondary"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            color="secondary"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="secondary" variant="contained" onClick={handleSubmit}>
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

const Settings = () => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      py: 8,
    }}
  >
    <Container maxWidth="lg">
      <Typography sx={{ mb: 3 }} variant="h4">
        Settings
      </Typography>
      <Box sx={{ pt: 3 }}>
        <PasswordUpdate />
      </Box>
    </Container>
  </Box>
);

export default Settings;
