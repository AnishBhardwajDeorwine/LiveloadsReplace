"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Visibility from "@mui/icons-material/Visibility";
import "./style.css";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import * as Yup from "yup";
import validationSchema from "./validationSchema";
import toast from "react-hot-toast";

const loginForm = () => {
  const router = useRouter();
  const login = async (formData) => {
    console.log("Fetching the data");
    const response = await fetch(
      "https://liveload-api.vercel.app/api/v1/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    console.log("Data", data);
    return data;
  };
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [toggle, setToggle] = useState(false);

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
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.errors) {
        toast.error("Error while logging");
      } else if (data.message) {
        if (!data.status) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          router.push("/success");
        }
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      toast.error("Error occurred during login");
    },
  });

  const submitHandler = async () => {
    try {
      await validationSchema.validate(
        { email, password },
        { abortEarly: false }
      );
      loginMutation.mutate({ username: email, password });
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
              type={toggle ? "text" : "password"}
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
      {loginMutation?.isPending && (
        <div className="overlay">
          <div className="loading"></div>
        </div>
      )}
    </div>
  );
};

export default loginForm;
