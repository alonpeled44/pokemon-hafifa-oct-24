import { useEffect, useState } from "react";
import { StateSetter, User } from "../../app/layout";
import { useWindowWidth } from "../context/WindowWidthContext";
import { usePathname } from "next/navigation";
import VerticalDivider from "./VerticalDivider";
import UserGreeting from "./userGreeting";
import HeaderLinks from "./headerLinks";
import HeaderLinksDialog from "./HeaderLinksDialog";
import css from "../css/header.module.css";

interface Props {
  user: User | null;
  setUser: StateSetter<User | null>;
}

export default function Header({ user, setUser }: Props) {
  const currentDate = new Date().toLocaleDateString("en-gb", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const windowWidth = useWindowWidth();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId && storedUserId !== "-1") {
      setUser(
        users.find((user) => user.id.toString() === storedUserId) ?? null
      );
    } else {
      setUser(null);
    }
  }, [users, pathname]);

  return (
    <>
      {pathname !== "/login" && windowWidth <= 1200 && !isLoading && (
        <HeaderLinksDialog />
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
          {pathname !== "/login" && !isLoading && (
            <>
              {windowWidth > 1200 && <VerticalDivider />}
              <UserGreeting user={user?.username || "Guest"} />
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
