"use client";

import React, { useEffect, useState } from "react";
import Header from "../public/components/header";
import HeaderLinksDialog from "../public/components/HeaderLinksDialog";
import css from "../public/css/general.module.css";

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");

    const handleThemeChange = () => {
      const updatedTheme = localStorage.getItem("theme");
      setTheme(updatedTheme || "light");
      console.log(updatedTheme);
    };

    typeof window !== undefined &&
      window.addEventListener("storage", handleThemeChange);

    return () =>
      typeof window !== undefined &&
      window.removeEventListener("storage", handleThemeChange);
  }, []);

  return (
    <html lang="en" className={css.html} data-theme={theme}>
      <head>
        <title>Pokedex</title>
        <link
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/128/868/868596.png"
        />
      </head>
      <body className={css.body}>
        <Header />
        {children}
      </body>
    </html>
  );
}
