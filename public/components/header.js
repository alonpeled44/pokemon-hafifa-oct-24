import css from '../../css/general.module.css'

export default function Header() {
    let showDate = "";
    if (400 > 375) {
        showDate = new Date().toLocaleDateString('en-gb', { day: "numeric", month: "numeric", year: "numeric" });
    }
    else {
        showDate = new Date().toLocaleDateString('en-gb', { day: "numeric", month: "numeric", year: "2-digit" });
    }
    {console.log(showDate)}
    return (
        <header className={css.header}>
            <div>
                <img src="https://cdn-icons-png.flaticon.com/128/868/868596.png" alt="pokeball" />
                <h1>Pokèmon</h1>
            </div>
            <div>
                <h1>{showDate}</h1>
            </div>
        </header>
    )
}