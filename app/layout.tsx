"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WindowWidthProvider } from "../public/context/WindowWidthContext";
import Header from "../public/components/header";
import css from "../public/css/general.module.css";
import SettingsMenu from "../public/components/settingsMenu";

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [fontSize, setFontSize] = useState<"13px" | "16px" | "19px">("16px");
  const pathname = usePathname();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    const storedFontSize = localStorage.getItem("font-size") as
      | "13px"
      | "16px"
      | "19px";
    setTheme((prev) => (storedTheme ? storedTheme : prev));
    setFontSize((prev) => (storedFontSize ? storedFontSize : prev));
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("font-size", fontSize);
  }, [theme, fontSize]);

  useEffect(() => {
    if (pathname === "/login") {
      setTheme("light");
      setFontSize("16px");
    }
  }, [pathname]);

  return (
    <html
      lang="en"
      className={css.html}
      data-theme={theme}
      data-font-size={fontSize}
    >
      <head>
        <title>Pokedex</title>
        <link
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/128/868/868596.png"
        />
      </head>
      <WindowWidthProvider>
        <body className={css.body}>
          {pathname !== "/login" && (
            <SettingsMenu
              theme={theme}
              setTheme={setTheme}
              fontSize={fontSize}
              setFontSize={setFontSize}
            />
          )}
          <Header />
          {children}
        </body>
      </WindowWidthProvider>
    </html>
  );
}
