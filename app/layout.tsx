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

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleUsers = async (storedUserID: string) => {
    const users: User[] = await fetchUsers();
    const currentUser = users.find(
      (user) => user.id.toString() === storedUserID || null
    ) as User;
    return currentUser;
  };

  const updateUserSettings = async (user: Partial<User>) => {
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

  const initUserData = async () => {
    const storedUserID = localStorage.getItem("user_id");
    console.log(storedUserID);
    const currentUser = await handleUsers(storedUserID as string);
    const storedTheme = (currentUser?.theme as Theme) || null;
    const storedFontSize = (currentUser?.font_size as FontSize) || null;
    console.log(currentUser);
    setTheme((prev) => (storedTheme ? storedTheme : prev));
    setFontSize((prev) => (storedFontSize ? storedFontSize : prev));
    setUser(currentUser);
  };

  useEffect(() => {
    initUserData();
  }, []);

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
              updateUserSettings={updateUserSettings}
              user={user as User}
            />
          )}
          <Header user={user} setUser={setUser} />
          <p>{user !== undefined ? user?.theme : "NOTHING"}</p>
          {children}
        </body>
      </WindowWidthProvider>
    </html>
  );
}
