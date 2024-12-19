import css from '../css/general.module.css'

export default function Header() {
    const currentDate = new Date().toLocaleDateString('en-gb', { day: "numeric", month: "numeric", year: "numeric" });
    return (
        <header className={css.header}>
            <div>
                <img src="https://cdn-icons-png.flaticon.com/128/868/868596.png" alt="pokeball" />
                <h1>Pokèmon</h1>
            </div>
            <div>
                <h1>{currentDate}</h1>
            </div>
        </header>
    )
}