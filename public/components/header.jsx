import { useEffect, useState } from "react";
import BurgerMenu from "./burgerMenu";
import HeaderLinks from "./headerLinks";
import css from "../css/header.module.css";

export default function Header() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("user") === null)
      setIsSignedIn(false);
  });

  const currentDate = new Date().toLocaleDateString("en-gb", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  return (
    <>
      {isSignedIn && <BurgerMenu />}
      <header className={css.header}>
        <section>
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/128/868/868596.png"
              alt="pokeball"
            />
            <h1>Pokèmon</h1>
          </div>
          <HeaderLinks />
        </section>
        <h1>{currentDate}</h1>
      </header>
    </>
  );
}
