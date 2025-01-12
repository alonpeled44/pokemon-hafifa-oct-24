import css from "../css/header-links.module.css";

export default function HeaderLinks() {
  return (
    <div className={css["header-links-wrapper"]}>
      <div />
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
