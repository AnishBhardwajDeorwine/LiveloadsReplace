import React from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import style from "./page.module.css";

const signup = () => {
  export const metadata = {
  title: "Best Chat App - Secure & Fast",
  description: "Join our chat app for real-time conversations with security and speed.",
  openGraph: {
    title: "Best Chat App",
    description: "The fastest chat app for secure messaging.",
    url: "https://example.com",
    siteName: "ChatApp",
    images: [
      {
        url: "https://example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chat App Screenshot",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Chat App - Secure & Fast",
    description: "Join our chat app for real-time conversations with security and speed.",
    images: ["https://example.com/twitter-image.jpg"],
  },
};
  return (
    <div className={style.display}>
      <h2>Sign Up Page Coming soon</h2>
      <Link href="/">
        <Button variant="contained">Login Page</Button>
      </Link>
    </div>
  );
};

export default signup;
