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
import * as Yup from "yup"; // Import Yup
import validationSchema from "./validationSchema"; // Import the Yup schema you created

import "./page.module.css";
const loginForm = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [toggle, setToggle] = useState(true);

  const handlePasswordToggle = () => {
    setToggle(!toggle);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
    setErrorPassword("");
  };
  const submitHandler = async () => {
    // e.preventDefault();
    try {
      await validationSchema.validate(
        { email, password },
        { abortEarly: false }
      );

      // Validation passed, proceed with form submission logic here
      console.log("Form data:", { email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path === "email") {
            setError(err.message);
          }
          if (err.path === "password") {
            setErrorPassword(err.message);
          }
        });
      }
    }
    console.log("Submit handler");
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
            <Button variant="contained" onClick={submitHandler}>
              Login
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default loginForm;
