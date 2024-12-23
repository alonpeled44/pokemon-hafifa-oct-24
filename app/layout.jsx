"use client";

import React from "react";
import Header from "../public/components/header";
import css from "../public/css/general.module.css";

export default function RootLayout({ children }) {
  return (
      <html lang="en" className={css.html}>
        <body className={css.body}>
          <Header />
          {children}
        </body>
      </html>
  );
}
