import css from "../css/search-bar.module.css";

export default function SearchBar({ setSearchValue }) {
  return (
    <div className={css.wrapper}>
      <img
        src={"https://img.icons8.com/?size=50&id=132&format=png"}
        alt={"search-icon"}
      />
      <input
        type={"search"}
        placeholder={"Search the Pokedex!"}
        onInput={(event) => setSearchValue(event.target.value)}
      />
    </div>
  );
}
