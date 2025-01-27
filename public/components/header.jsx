import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import UserGreeting from "./UserGreeting";
import HeaderLinks from "./headerLinks";
import HeaderLinksDialog from "./HeaderLinksDialog";
import css from "../css/header.module.css";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-gb", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const pathname = usePathname();
  const [windowWidth, setWindowWidth] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser);
    }
  });

  return (
    <>
      {user && windowWidth <= 1200 && (
        <HeaderLinksDialog windowWidth={windowWidth} />
      )}
      <header className={css.header}>
        <div>
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/128/868/868596.png"
              alt="pokeball"
            />
            <h1>Pokèmon</h1>
          </div>
          {user && <UserGreeting user={user} windowWidth={windowWidth} />}
          {user && windowWidth > 1200 && <HeaderLinks />}
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
