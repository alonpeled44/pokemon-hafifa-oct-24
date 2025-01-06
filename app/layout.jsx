"use client";

import React from "react";
import Header from "../public/components/header";
import css from "../public/css/general.module.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={css.html}>
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
