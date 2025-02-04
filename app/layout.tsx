"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WindowWidthProvider } from "../public/context/WindowWidthContext";
import Header from "../public/components/header";
import css from "../public/css/general.module.css";
import SettingsMenu from "../public/components/settingsMenu";

type Theme = "light" | "dark";
type PixelSize = "13px" | "16px" | "19px";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("light");
  const [fontSize, setFontSize] = useState<PixelSize>("16px");
  const pathname = usePathname();

  useEffect(() => {
    if (
      localStorage.getItem("theme") !== "light" &&
      localStorage.getItem("theme") !== "dark"
    ) {
      throw new Error("Invalid `Theme` value");
    }
    if (
      localStorage.getItem("font-size") !== "13px" ||
      localStorage.getItem("font-size") !== "16px" ||
      localStorage.getItem("font-size") !== "19px"
    ) {
      throw new Error("Invalid `Font-size` value");
    }
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const storedFontSize = localStorage.getItem(
      "font-size"
    ) as PixelSize | null;
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
