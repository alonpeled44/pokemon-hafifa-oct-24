import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWindowWidth } from "../context/WindowWidthContext";
import users from "../users";
import css from "../css/login.module.css";

export default function LoginForm() {
  const router = useRouter();
  const _users = [...users];
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const windowWidth = useWindowWidth();

  return (
    <div className={css.wrapper}>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          setShowError(true);

          _users.forEach((user) => {
            if (username === user.username && password === user.password) {
              localStorage.setItem("user", username);
              setShowError(false);
              router.replace("/");
            }
          });
        }}
      >
        {windowWidth > 1200 && (
          <h1>
            L
            <span>
              <img src="https://cdn-icons-png.flaticon.com/128/868/868596.png" />
            </span>
            gin
          </h1>
        )}
        <section className={css.inputs}>
          <input
            type="text"
            id="_username"
            placeholder="username..."
            onChange={(event) => {
              const value = event.target.value;
              if (/^[A-Za-z0-9]*$/.test(value)) {
                setUsername(value);
              }
            }}
            value={username}
            required
          />
          <input
            type="password"
            id="_password"
            placeholder="password..."
            onChange={(event) => {
              const value = event.target.value;
              if (/^[A-Za-z0-9]*$/.test(value)) {
                setPassword(value);
              }
            }}
            value={password}
            required
          />
          {showError && <p>{"Username or password are incorrect"}</p>}
        </section>
        <section className={css.buttons}>
          <button type="submit">Login</button>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();

              localStorage.setItem("user", "Guest");
              router.replace("/");
            }}
          >
            Join As Guest
          </button>
        </section>
      </form>
    </div>
  );
}
