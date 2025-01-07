import BurgerMenu from "./burgerMenu";
import HeaderLinks from "./headerLinks";
import css from "../css/header.module.css";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-gb", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <>
      <BurgerMenu />
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
