"use client";

import React from "react";
import Header from "../public/components/header";
import { UserProvider } from "../public/context/userContext";
import css from "../public/css/general.module.css";

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en" className={css.html}>
        <head></head>
        <body className={css.body}>
          <Header />
          {children}
        </body>
      </html>
    </UserProvider>
  );
}
