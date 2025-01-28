import { useEffect, useRef } from "react";
import css from "../css/search-bar.module.css";

export default function SearchBar({ setSearchValue }) {
  const search = useRef(null);
  useEffect(() => {
    const handleInput = () => {
      setSearchValue(search.current.value);
    };
    search.current.addEventListener("input", handleInput);
    return () => search.current.addEventListener("input", handleInput);
  }, []);

  return (
    <div className={css.wrapper}>
      <img
        src={"https://img.icons8.com/?size=50&id=132&format=png"}
        alt={"search-icon"}
      />
      <input type={"search"} placeholder={"Search the Pokedex!"} ref={search} />
    </div>
  );
}
