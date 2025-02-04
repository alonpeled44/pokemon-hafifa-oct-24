import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useWindowWidth } from "../context/WindowWidthContext";
import VerticalDivider from "./VerticalDivider";
import UserGreeting from "./userGreeting";
import HeaderLinks from "./headerLinks";
import HeaderLinksDialog from "./HeaderLinksDialog";
import css from "../css/header.module.css";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-gb", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const [user, setUser] = useState<string>("");
  const pathname = usePathname();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user") as string;
      setUser(storedUser);
    }
  });

  return (
    <>
      {user && windowWidth <= 1200 && <HeaderLinksDialog />}
      <header className={css.header}>
        <div>
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/128/868/868596.png"
              alt="pokeball"
            />
            <h1>Pokèmon</h1>
          </div>
          {user && (
            <>
              {windowWidth > 1200 && <VerticalDivider />}
              <UserGreeting user={user} />
              {windowWidth > 1200 && (
                <>
                  <VerticalDivider />
                  <HeaderLinks />
                </>
              )}
            </>
          )}
        </div>
        {windowWidth > 1200 && (
          <div>
            <h1
              style={
                pathname !== "/login" ? { marginRight: "60px" } : undefined
              }
            >
              {currentDate}
            </h1>
          </div>
        )}
      </header>
    </>
  );
}
