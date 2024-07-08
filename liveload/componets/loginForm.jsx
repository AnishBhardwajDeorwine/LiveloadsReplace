"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Visibility from "@mui/icons-material/Visibility";
import "./style.css";
import { useForm } from "react-hook-form";
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
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as Yup from "yup";
import validationSchema from "./validationSchema";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const login = async (formData) => {
    const response = await axios.post(
      "https://liveload-api.vercel.app/api/v1/login",
      formData
    );
    const data = response.data;
    return data;
  };
  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const handlePasswordToggle = () => {
    setToggle(!toggle);
  };
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/success");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const onSubmit = async (formData) => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const requestData = {
        username: formData.email,
        password: formData.password,
      };
      loginMutation.mutate(requestData);
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
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs spacing={5}>
            <Stack spacing={1}>
              <InputLabel sx={{ fontSize: 13, color: "black" }}>
                Email Address
              </InputLabel>
              <TextField
                {...register("email")}
                sx={{
                  marginBottom: 2,
                  "& .MuiFormHelperText-root": { color: "red" },
                }}
                id="email"
                helperText={error}
                onChange={() => setError("")}
              />
              <InputLabel sx={{ fontSize: 13, color: "black" }}>
                Password
              </InputLabel>
              <TextField
                type={toggle ? "text" : "password"}
                {...register("password")}
                onChange={() => setErrorPassword("")}
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
              <Button type="submit" variant="contained">
                Login
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
      {loginMutation?.isPending && (
        <div className="overlay">
          <div className="loading"></div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
