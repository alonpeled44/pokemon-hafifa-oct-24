import css from "../css/header-links.module.css";

export default function HeaderLinks({ windowWidth }) {
  return (
    <div className={css["header-links-wrapper"]}>
      {windowWidth > 1200 && <div />}
      <ul>
        <li>
          <a href="/" title="Go to the pokedex!">
            Pokédex
          </a>
        </li>
      </ul>
    </div>
  );
}
