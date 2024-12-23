import LogOut from "./LogOut";
import css from "../css/userGretting.module.css";

export default function UserGreeting({ user }) {
  return (
    <div className={css.greetingWrapper}>
      <div className={css.verticalDivider} />
      <h2>{`Hello, ${user}!`}</h2>
      <LogOut />
    </div>
  );
}
