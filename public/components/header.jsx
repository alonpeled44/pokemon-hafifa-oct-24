import css from "../css/header.module.css";
import { useUser } from "../context/userContext";
import UserGreeting from "./userGreeting";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-gb", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const title = "Pokèmon";

  const { user } = useUser();
  const showGreeting = () => {
    if (user !== "") {
      return <UserGreeting user={user} />;
    }
    return;
  };
  return (
    <header className={css.header}>
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/128/868/868596.png"
          alt="pokeball"
        />
        <h1>{title}</h1>
        {showGreeting()}
      </div>
      <div>
        <h1>{currentDate}</h1>
      </div>
    </header>
  );
}
