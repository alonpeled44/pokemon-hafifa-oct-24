"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import users from "../users";
import css from "../css/login.module.css";

export default function LoginForm() {
  const router = useRouter();
  const _users = [...users];
  const [windowWidth, setWindowWidth] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z0-9]*$/.test(value)) {
      setUsername(value);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z0-9]*$/.test(value)) {
      setPassword(value);
    }
  };

  const handleGuset = (e) => {
    e.preventDefault();

    localStorage.setItem("user", "Guest");
    router.replace("/");
    router.refresh();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowError(true);

    _users.forEach((user) => {
      if (username === user.username && password === user.password) {
        localStorage.setItem("user", username);
        setShowError(false);
        router.replace("/");
        router.refresh();
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
