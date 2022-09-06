import { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Logo from "../../assets/logo.png";

const Login = ({ login }) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const handleChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

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
