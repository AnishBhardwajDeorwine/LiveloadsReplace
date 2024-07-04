import Image from "next/image";
import styles from "./page.module.css";
import Button from "@mui/material/Button";
import Link from "next/link";
import style from "./page.module.css";
import logo from "../public/assests/logo.webp";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import Login from "../componets/loginForm";
export default function Home() {
  return (
    <div className={style.display}>
      <Image src={logo} alt="Logo" className={style.logo} />
      <Stack spacing={2} padding={3} borderRadius="3%" bgcolor="white">
        <Grid
          gap={3}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          max-width="full"
          sx={{
            flexWrap: "nowrap",
          }}
        >
          <div className={style.heading}>Login to Liveloads</div>
          <Link href="/signup" className={style.link}>
            Don&apos;t have an Account
          </Link>
        </Grid>
        <div>
          <Login />
        </div>
      </Stack>
    </div>
  );
}
