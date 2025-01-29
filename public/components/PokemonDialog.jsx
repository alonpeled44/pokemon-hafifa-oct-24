import { useEffect, useRef } from "react";
import css from "../css/pokemon-dialog.module.css";

export default function PokemonDialog({ pokeList, clickedCardID }) {
  const dialog = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!content.current.contains(event.target)) dialog.current.close();
      else dialog.current.showModal();
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <dialog ref={dialog} className={css.dialog}>
      <div ref={content} className={css.content}>
        <button onClick={() => dialog.current.close()}>&times;</button>

        <p>{clickedCardID}</p>
      </div>
    </dialog>
  );
}
