"use client";

import React, { useState } from "react";
import Header from "../public/components/header";
import css from "../public/css/general.module.css";

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");
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
