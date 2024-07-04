"use client";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import "./page.module.css";
const loginForm = () => {
  const [error, setError] = useState("");

  const [emailTouched, setEmailTouched] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [toggle, setToggle] = useState(true);

  const handlePasswordToggle = () => {
    setToggle(!toggle);
  };
  const emailChange = (e) => {
    setEmailTouched(true);
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    let pass = e.target.value;
    setPassword(pass);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs spacing={5}>
          <Stack spacing={1}>
            <InputLabel sx={{ fontSize: 13, color: "black" }}>
              Email Address
            </InputLabel>
            <TextField
              onChange={emailChange}
              sx={{
                marginBottom: 2,
                "& .MuiFormHelperText-root": { color: "red" },
              }}
              id="email"
              helperText={error}
            />
            <InputLabel sx={{ fontSize: 13, color: "black" }}>
              Password
            </InputLabel>
            <TextField
              type={toggle ? "password" : "text"}
              onChange={passwordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordToggle}
                      edge="end"
                    >
                      {toggle ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                marginBottom: 2,
                outline: "none",
                "& .MuiFormHelperText-root": { color: "red" },
              }}
              helperText={errorPassword}
            />
            <Stack alignItems={"flex-end"} marginTop={2} marginBottom={4}>
              <Link
                href="/forgetPassword"
                underline="none"
                color={"black"}
                sx={{ "&:hover": { color: "#1890ff" } }}
              >
                Forget Password?
              </Link>
            </Stack>
            <br />
            <Button variant="contained">Login</Button>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default loginForm;
