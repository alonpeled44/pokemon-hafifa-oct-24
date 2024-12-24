import BurgerMenu from "./burgerMenu";
// import UserGreeting from "./userGreeting";
import HeaderLinks from "./headerLinks";
import css from "../css/header.module.css";
import { useEffect, useState } from "react";

export default function Header() {
  const [showBurger, setShowBurger] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("user") === null)
      setShowBurger(false);
  });

  const currentDate = new Date().toLocaleDateString("en-gb", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  return (
    <>
      {showBurger && <BurgerMenu />}
      <header className={css.header}>
        <section>
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/128/868/868596.png"
              alt="pokeball"
            />
            <h1>Pokèmon</h1>
          </div>
          {/* {user && <UserGreeting user={user} />} */}
          {<HeaderLinks />}
        </section>
        <h1>{currentDate}</h1>
      </header>
    </>
  );
}
