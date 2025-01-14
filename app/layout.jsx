"use client";

import React, { useEffect, useState } from "react";
import Header from "../public/components/header";
import css from "../public/css/general.module.css";

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState();

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
  }, []);

  useEffect(() => {
    const handleThemeChange = () => {
      const updatedTheme = localStorage.getItem("theme");
      setTheme(updatedTheme || "light");
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
