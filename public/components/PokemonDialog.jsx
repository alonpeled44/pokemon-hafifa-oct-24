import { useEffect, useRef } from "react";
import css from "../css/pokemon-dialog.module.css";

export default function PokemonDialog({ pokemon, openDialog, setOpenDialog }) {
  const dialog = useRef(null);

  useEffect(() => {
    openDialog0 ? dialog.current.showModal() : dialog.current.close();
  }, [openDialog]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDialog && !dialog.current.contains(event.target)) {
        setOpenDialog(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <dialog ref={dialog} className={css.dialog}>
      <button onClick={() => setOpenDialog(false)}>&times;</button>
    </dialog>
  );
}
