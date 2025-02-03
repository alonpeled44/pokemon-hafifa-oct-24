import { useEffect, useRef, useState } from "react";
import { useWindowWidth } from "../context/WindowWidthContext";
import css from "../css/pokemon-dialog.module.css";

export default function PokemonDialog({ selectedPokemon, setIsDialogOpen }) {
  const dialog = useRef(null);
  const content = useRef(null);

  const [isShiny, setIsShiny] = useState(false);
  const windowWidth = useWindowWidth();

  const handleClick = (event) => {
    if (!content.current.contains(event.target)) {
      closeModal();
    }
  };

  const closeModal = () => {
    dialog.current.close();
    setIsDialogOpen(false);
  };

  useEffect(() => {
    dialog.current.showModal();

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <dialog
      ref={dialog}
      className={css.dialog}
      onCancel={(event) => {
        event.preventDefault();
        closeModal();
      }}
    >
      <div ref={content} className={css.content}>
        {windowWidth > 1200 && <button onClick={closeModal}>&times;</button>}
        <section className={css["card-header"]}>
          <h1>{selectedPokemon.name}</h1>
          <div>
            <div>
              <input
                type={"checkbox"}
                id={"isShiny"}
                onChange={() => {
                  setIsShiny((prev) => !prev);
                }}
              />
              <label htmlFor={"isShiny"} data-is-shiny={isShiny}>
                Shiny
              </label>
            </div>
            <p>{`#${selectedPokemon.id}`}</p>
          </div>
        </section>
        <section className={css["card-img"]}>
          <img
            src={
              isShiny
                ? selectedPokemon.frontViewShiny
                : selectedPokemon.frontView
            }
            alt={"pokemon_front"}
          />
          <img
            src={
              isShiny ? selectedPokemon.backViewShiny : selectedPokemon.backView
            }
            alt={"pokemon_back"}
          />
        </section>
        <section className={css["card-info"]}>
          <p>
            <span>{"Type(s): "}</span>
            {selectedPokemon.types.join(", ")}
          </p>
          <p>
            <span>{"Height: "}</span>
            {`${selectedPokemon.height}m`}
          </p>
          <p>
            <span>{"Weight: "}</span>
            {`${selectedPokemon.weight}kg`}
          </p>
        </section>
      </div>
    </dialog>
  );
}
