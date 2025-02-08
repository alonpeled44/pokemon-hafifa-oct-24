"use client";

import React, { useEffect, useState } from "react";
import { WindowWidthProvider } from "../public/context/WindowWidthContext";
import { usePathname } from "next/navigation";
import Header from "../public/components/header";
import SettingsMenu from "../public/components/settingsMenu";
import css from "../public/css/general.module.css";

export type Theme = "light" | "dark";
export type FontSize = "13px" | "16px" | "19px";
export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
export interface User {
  id: number;
  username: string;
  password: string;
  theme: Theme;
  font_size: FontSize;
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: ChildrenProps) {
  const themes: { light: Theme; dark: Theme } = {
    light: "light",
    dark: "dark",
  };
  const fontSizes: { large: FontSize; medium: FontSize; small: FontSize } = {
    large: "19px",
    medium: "16px",
    small: "13px",
  };
  const [theme, setTheme] = useState<Theme>(themes.light);
  const [fontSize, setFontSize] = useState<FontSize>(fontSizes.medium);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleData = async (storedUserID: string) => {
    const data: User[] = await fetchData();
    setUser(
      data.find((user) => user.id.toString() === storedUserID || null) as User
    );
  };

  const updateSettings = async (user: Partial<User>) => {
    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Failed to update user's settings");
      }
      return await response.json();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const storedUserID = localStorage.getItem("user_id");
    handleData(storedUserID as string);
    const storedTheme = (user?.theme as Theme) || null;
    const storedFontSize = (user?.font_size as FontSize) || null;

    if (
      storedTheme !== themes.light &&
      storedTheme !== themes.dark &&
      storedTheme !== null &&
      pathname !== "/login"
    ) {
      throw new Error("Invalid `Theme` value");
    }
    if (
      storedFontSize !== fontSizes.large &&
      storedFontSize !== fontSizes.medium &&
      storedFontSize !== fontSizes.small &&
      storedFontSize !== null &&
      pathname === "/login"
    ) {
      throw new Error("Invalid `Font-size` value");
    }
    setTheme((prev) => (storedTheme ? storedTheme : prev));
    setFontSize((prev) => (storedFontSize ? storedFontSize : prev));
  }, []);

  useEffect(() => {
    if (user) {
      updateSettings({
        id: user.id,
        theme: theme,
        font_size: fontSize,
      } as Partial<User>);
    }
  }, [user, theme, fontSize]);

  useEffect(() => {
    if (pathname === "/login") {
      setTheme(themes.light);
      setFontSize(fontSizes.medium);
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
