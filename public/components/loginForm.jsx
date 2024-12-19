import css from '../css/login.module.css';
export default function LoginForm() {
    return (
        <div className={css.componentWrapper}>
            <div className={css.blurryBackground}></div>
            <div className={css.formWrapper}>
                <form>
                    <h1>L<span><img src="https://cdn-icons-png.flaticon.com/128/868/868596.png" /></span>gin</h1>
                    <section className={css.inputs}>
                        <input type="text" id="_username" placeholder="username..." />
                        <input type="password" id="_password" placeholder="password..." />
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