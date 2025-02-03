"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WindowWidthProvider } from "../public/context/WindowWidthContext";
import Header from "../public/components/header";
import css from "../public/css/general.module.css";
import SettingsMenu from "../public/components/settingsMenu";

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState<string>("");
  const [fontSize, setFontSize] = useState<string>("");
  const pathname: string = usePathname();

  useEffect(() => {
    const storedTheme: string = localStorage.getItem("theme");
    const storedFontSize: string = localStorage.getItem("font-size");
    setTheme(storedTheme ? storedTheme : "light");
    setFontSize(storedFontSize ? storedFontSize : "16px");
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
