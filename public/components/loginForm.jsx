'use client';

import React, { useState } from 'react';
import css from '../css/login.module.css';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

    const saveduUsername = username;
    const savedPassword = password;
    
    return (
        <div className={css.componentWrapper}>
            <div className={css.blurryBackground}></div>
            <div className={css.formWrapper}>
                <form>
                    <h1>L<span><img src="https://cdn-icons-png.flaticon.com/128/868/868596.png" /></span>gin</h1>
                    <section className={css.inputs}>
                        <input type="text" id="_username" placeholder="username..." onChange={handleUsernameChange} value={username}/>
                        <input type="password" id="_password" placeholder="password..." onChange={handlePasswordChange} value={password}/>
                        <p></p>
                    </section>
                    <section className={css.buttons}>
                        <button id="login-btn" type="button">Login</button>
                        <button id="join-as-guest-btn" type="button">Join As Guest</button>
                    </section>
                </form>
            </div>
        </div>
    )
}
