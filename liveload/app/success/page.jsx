import React from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import style from "./page.module.css";

const success = () => {
  return (
    <div className={style.display}>
      <h2>Success Page Coming soon</h2>
      <Link href="/">
        <Button variant="contained">Login Page</Button>
      </Link>
    </div>
  );
};

export default success;
