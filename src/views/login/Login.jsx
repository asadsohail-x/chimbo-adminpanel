import { useState, useEffect } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

import Logo from "../../assets/logo.png";

import { useCookies } from "react-cookie";

import { useDispatch, useSelector } from "react-redux";

import { loginAsync, clear } from "../../redux/admin/admin.slice";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Loader from "../../Loader";

const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [, setCookie] = useCookies(["user"]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const data = useSelector((state) => state.admin.data);
  const error = useSelector((state) => state.admin.error);

  useEffect(() => {
    if (!isLoading && error) {
      toast.error(error);
    }

    return () => {
      dispatch(clear());
    };
  }, [error, isLoading, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch Login Action
    dispatch(loginAsync(formState.email, formState.password));
  };

  // handle admin state change
  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn) {
        if (Object.keys(data).length) {
          setCookie("user", { ...data, loggedIn: true });
          navigate("/");
        }
      }
    }
  }, [data, isLoading, isLoggedIn, navigate, setCookie]);

  const handleChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
        pt: 5,
      }}
    >
      <Container maxWidth="sm" sx={{ pt: 5 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ textAlign: "center" }}>
            <img src={Logo} alt="Logo" style={{ width: "200px" }} />
          </Box>
          <Box sx={{ my: 3, textAlign: "center" }}>
            <Typography color="textPrimary" variant="h5">
              Log In
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Log in on the Chimbo Admin Panel
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            name="email"
            onChange={handleChange}
            type="email"
            value={formState.email}
            color="secondary"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.password}
            color="secondary"
            variant="outlined"
          />
          <Box sx={{ py: 2 }}>
            <Button
              color="secondary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign In Now
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
