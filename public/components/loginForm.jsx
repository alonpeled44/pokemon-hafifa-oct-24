import css from '../css/login.module.css';
export default function LoginForm() {
    return (
        <main className={css.mainWrapper}>
            <div className={css.blurryBackground}></div>
            <section className={css.main}>
                <section className={css.formWrapper}>
                    <form className={css.form}>
                        <h1 className={css.title}>L<span><img src="https://cdn-icons-png.flaticon.com/128/868/868596.png" /></span>gin</h1>
                        <section className={css.inputs}>
                            <input className={css.input} type="text" id="_username" placeholder="username..." />
                            <input className={css.input} type="password" id="_password" placeholder="password..." />
                            <h6 className={css.msg}></h6>
                        </section>
                        <section className={css.buttons}>
                            <button className={css.button} id="login-btn" type="button">Login</button>
                            <button className={css.button} id="join-as-guest-btn" type="button">Join As Guest</button>
                        </section>
                    </form>
                </section>
            </section>
        </main>
    )
} 