import LogOut from "./logOut";
import css from "../css/user-greeting.module.css";

interface Props {
  user: string;
}

export default function UserGreeting({ user }: Props) {
  return (
    <div className={css.wrapper}>
      <h2>{`Hello, ${user}!`}</h2>
      <LogOut user={user} />
    </div>
  );
}
