import { useEffect, useState } from "react";
import UserGreeting from "./UserGreeting";
import SettingsMenu from "./settingsMenu";
import css from "../css/header.module.css";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-gb", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const [user, setUser] = useState();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser);
    }
  });

  return (
    <header className={css.header}>
      <div>
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/128/868/868596.png"
            alt="pokeball"
          />
          <h1>Pokèmon</h1>
        </div>
        {user && <UserGreeting user={user} />}
      </div>
      <div>
        <h1>{currentDate}</h1>
        <SettingsMenu />
      </div>
    </header>
  );
}
