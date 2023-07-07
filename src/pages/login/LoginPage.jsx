import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import { CircleSpinnerOverlay } from "react-spinner-overlay";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  ErrorLogin,
  ErrorNetwork,
} from "../../components/dialog_popup/ErrorDialogPopup";

export default function LoginPage({ setToken }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      navigate("/");
    }
  }, [navigate]);

  async function loginUser(credentials) {
    return await axios
      .post("http://localhost/auth/login", credentials)
      .then((res) => {
        return res.data.token;
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            return "Unauthorized";
          } else {
            return "ServerError";
          }
        } else {
          return "ServerError";
        }
      });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    const token = await loginUser({
      username: data.get("email"),
      password: data.get("password"),
    });

    if (token === "Unauthorized") {
      setLoading(false);
      ErrorLogin();
    } else if (token === "ServerError") {
      setLoading(false);
      ErrorNetwork();
    } else {
      setLoading(false);
      await setToken(token);
      navigate("/");
    }
  };

  return (
    <>
      <CircleSpinnerOverlay
        size={200}
        loading={loading}
        overlayColor="rgba(0,153,255,0.2)"
      />
      <Container
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        component="main"
        maxWidth="lg"
      >
        <Box>
          <Grid container>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage:
                  "url(https://cdni.iconscout.com/illustration/premium/thumb/user-login-4268415-3551762.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square={false}
              sx={{
                borderRadius: "20px 20px 20px 20px",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired,
};
