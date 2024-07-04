import Image from "next/image";
import styles from "./page.module.css";
import Button from "@mui/material/Button";
import Link from "next/link";
import style from "./page.module.css";
import logo from "../public/assests/logo.webp";

export default function Home() {
  return (
    <div className={style.display}>
      <Image src={logo} alt="Logo" className={style.logo} />
    </div>
  );
}
