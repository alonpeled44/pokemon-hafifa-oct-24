import LogOut from "./logOut";
import css from "../css/user-greeting.module.css";

export default function UserGreeting({ user }: { user: string }) {
  return (
    <div className={css.wrapper}>
      <h2>{`Hello, ${user}!`}</h2>
      <LogOut user={user} />
    </div>
  );
}
