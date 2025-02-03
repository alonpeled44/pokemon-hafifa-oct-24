import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useWindowWidth } from "../context/WindowWidthContext";
import users, { user } from "../users";
import css from "../css/login.module.css";

export default function LoginForm() {
  const router: AppRouterInstance = useRouter();
  const _users: user[] = [...users];
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const windowWidth: number = useWindowWidth();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as string;
    if (/^[A-Za-z0-9]*$/.test(value)) {
      setUsername(value);
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as string;
    if (/^[A-Za-z0-9]*$/.test(value)) {
      setPassword(value);
    }
  };

  const handleGuset = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    localStorage.setItem("user", "Guest");
    router.replace("/");
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    setShowError(true);

    _users.forEach((user) => {
      if (username === user.username && password === user.password) {
        localStorage.setItem("user", username);
        setShowError(false);
        router.replace("/");
      }
    });
  };

  return (
    <div className={css.wrapper}>
      <form onSubmit={handleSubmit}>
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
            onChange={handleUsernameChange}
            value={username}
            required
          />
          <input
            type="password"
            id="_password"
            placeholder="password..."
            onChange={handlePasswordChange}
            value={password}
            required
          />
          {showError && <p>{"Username or password are incorrect"}</p>}
        </section>
        <section className={css.buttons}>
          <button type="submit">Login</button>
          <button type="button" onClick={handleGuset}>
            Join As Guest
          </button>
        </section>
      </form>
    </div>
  );
}
