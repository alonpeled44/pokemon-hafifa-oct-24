import css from '../css/login.module.css';
export default function LoginForm() {
    return (
        <main className={css.main}>
            <form className={css.form}>
                <h1 className={css.title}>Login</h1>
                <section className={css.inputs}>
                    <input className={css.input} type="text" id="_username" placeholder="username..." maxLength={8} />
                    <input className={css.input} type="password" id="_password" placeholder="password..." maxLength={12} minLength={8}/>
                    <h6 className={css.msg}>user... incorrect</h6>
                </section>
                <section className={css.buttons}>
                    <button className={css.button} id="login-btn">Login</button> 
                    <button className={css.button} id="join-as-guest-btn">Join As Guest</button> 
                </section>
            </form>
        </main>
    )
} 