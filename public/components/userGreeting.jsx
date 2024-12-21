import LogOut from "./logout";
import css from "../css/userGretting.module.css";

export default function UserGreeting({ user }) {
  return (
    <div className={css.greetingWrapper}>
      <h2>{`Hello, ${user}!`}</h2>
      <LogOut />
    </div>
  );
}
