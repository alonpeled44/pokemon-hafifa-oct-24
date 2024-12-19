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
        <div className={css.componentWrapper}>
            <div className={css.blurryBackground}></div>
            <div className={css.formWrapper}>
                <form>
                    <h1>L<span><img src="https://cdn-icons-png.flaticon.com/128/868/868596.png" /></span>gin</h1>
                    <section className={css.inputs}>
                        <input type="text" id="_username" placeholder="username..." onChange={handleUsernameChange} />
                        <input type="password" id="_password" placeholder="password..." onChange={handlePasswordChange}/>
                        <p></p>
                    </section>
                    <section className={css.buttons}>
                        <button id="login-btn" type="button" onSubmit={handleSubmit}>Login</button>
                        <button id="join-as-guest-btn" type="button">Join As Guest</button>
                    </section>
                </form>
            </div>
        </div>
    )
}
