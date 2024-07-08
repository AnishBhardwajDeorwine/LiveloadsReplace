"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Visibility from "@mui/icons-material/Visibility";
import { yupResolver } from "@hookform/resolvers/yup";
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
import validationSchema from "./validationSchema";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const login = async (formData) => {
    const response = await axios.post(
      "https://liveload-api.vercel.app/api/v1/login",
      formData
    );
    const data = response.data;
    return data;
  };
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
    const requestData = {
      username: formData.email,
      password: formData.password,
    };
    loginMutation.mutate(requestData);
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
                helperText={errors?.email?.message}
              />
              <InputLabel sx={{ fontSize: 13, color: "black" }}>
                Password
              </InputLabel>
              <TextField
                type={toggle ? "text" : "password"}
                {...register("password")}
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
                helperText={errors?.password?.message}
              />
              <Stack alignItems={"flex-end"} marginTop={2} marginBottom={4}>
                <Link
                  href="/forgetPassword"
                  underline="none"
                  color={"black"}
                  sx={{ "&:hover": { color: "#1890ff" } }}
                >
                  Forgot Password?
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
