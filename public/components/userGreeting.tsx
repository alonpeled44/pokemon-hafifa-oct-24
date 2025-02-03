import LogOut from "./logOut";
import css from "../css/user-greeting.module.css";

interface UserGrettingProps {
  user: string;
}

export default function UserGreeting({ user }: UserGrettingProps) {
  return (
    <div className={css.wrapper}>
      <h2>{`Hello, ${user}!`}</h2>
      <LogOut user={user} />
    </div>
  );
}
