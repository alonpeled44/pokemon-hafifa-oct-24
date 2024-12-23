import css from "../css/header.module.css";
// import UserGreeting from "./userGreeting";
import HeaderLinks from "./headerLinks";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-gb", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const title = "Pokèmon";
  return (
    <header className={css.header}>
      <section>
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/128/868/868596.png"
            alt="pokeball"
          />
          <h1>{title}</h1>
        </div>
        {/* {user && <UserGreeting user={user} />} */}
        {<HeaderLinks />}
      </section>
      <h1>{currentDate}</h1>
    </header>
  );
}
