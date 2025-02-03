import LogOut from "./LogOut";
import css from "../css/user-greeting.module.css";

export default function UserGreeting({ user }) {
  return (
    <div className={css.wrapper}>
      <h2>{`Hello, ${user}!`}</h2>
      <LogOut />
    </div>
  );
}
