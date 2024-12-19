import css from '../css/header.module.css'

export default function Header() {
    const currentDate = new Date().toLocaleDateString('en-gb', { day: "numeric", month: "numeric", year: "numeric" });
    const title = "Pokèmon";
    return (
        <header className={css.header}>
            <div>
                <img src="https://cdn-icons-png.flaticon.com/128/868/868596.png" alt="pokeball" />
                <h1>{title}</h1>
            </div>
            <h1>{currentDate}</h1>
        </header>
    )
}