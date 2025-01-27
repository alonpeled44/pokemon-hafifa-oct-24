import LogOut from "./LogOut";
import css from "../css/user-greeting.module.css";

export default function UserGreeting({ user, windowWidth }) {
  return (
    <div className={css["greeting-wrapper"]}>
      {windowWidth > 1200 && <div className={css["vertical-divider"]} />}
      <h2>{`Hello, ${user}!`}</h2>
      <LogOut />
    </div>
  );
}
