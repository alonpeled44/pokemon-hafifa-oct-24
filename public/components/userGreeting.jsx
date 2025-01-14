import LogOut from "./LogOut";
import css from "../css/user-greeting.module.css";

export default function UserGreeting({ user }) {
  return (
    <div className={css["greeting-wrapper"]}>
      <div className={css["vertical-divider"]} />
      <h2>{`Hello, ${user}!`}</h2>
      <LogOut />
    </div>
  );
}
