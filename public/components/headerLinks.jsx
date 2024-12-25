import css from "../css/header-links.module.css";

export default function HeaderLinks() {
  return (
    <div className={css.headerLinksWrapper}>
      <div className={css.verticalDivider} />
      <ul className={css.list}>
        <li>
          <a href="/" title="Go to the pokedex!">
            Pokedex
          </a>
        </li>
        <li>
          <a href="/" title="Play and guess the pokemon!">
            Guess The Pokemon
          </a>
        </li>
      </ul>
    </div>
  );
}
