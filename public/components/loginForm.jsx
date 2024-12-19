'use client';

import React, { useState } from 'react';
import css from '../css/login.module.css';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z0-9]*$/.test(value)) {
            setUsername(value);
            setError(''); 
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z0-9]*$/.test(value)) {
            setPassword(value);
            setError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username.length === 0 || password.length === 0) {
            setError('Both fields are required!');
            return;
        }
        if (username === 'admin' && password === 'password123') {
            setError('');
            console.log('Login successful');
        } else {
            setError('Incorrect username or password');
        }
    };

    return (
        <main className={css.mainWrapper}>
            <div className={css.blurryBackground}></div>
            <section className={css.main}>
                <form className={css.form} onSubmit={handleSubmit}>
                    <h1 className={css.title}>
                        L<span><img src="https://cdn-icons-png.flaticon.com/128/868/868596.png" /></span>gin
                    </h1>
                    <section className={css.inputs}>
                        <input
                            className={css.input}
                            type="text"
                            id="_username"
                            placeholder="username..."
                            maxLength={8}
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <input
                            className={css.input}
                            type="password"
                            id="_password"
                            placeholder="password..."
                            maxLength={12}
                            minLength={8}
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <h6 className={css.msg} id="msg">{error}</h6>
                    </section>
                    <section className={css.buttons}>
                        <button className={css.button} id="login-btn" type="submit">Login</button>
                        <button className={css.button} id="join-as-guest-btn">Join As Guest</button>
                    </section>
                </form>
            </section>
        </main>
    );
}
