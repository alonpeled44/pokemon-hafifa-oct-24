import { useEffect, useRef, useState } from "react";
import css from "../css/pokemon-dialog.module.css";

export default function PokemonDialog({ selectedPokemon, setIsDialogOpen }) {
  const dialog = useRef(null);
  const content = useRef(null);

  const [isShiny, setIsShiny] = useState(false);

  const handleClick = (event) => {
    if (!content.current.contains(event.target)) {
      closeModal();
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    closeModal();
  };

  const closeModal = () => {
    dialog.current.close();
    setIsDialogOpen(false);
  };

  const handleChange = () => {
    setIsShiny((prev) => !prev);
  };

  const capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    dialog.current.showModal();

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <dialog ref={dialog} className={css.dialog} onCancel={handleCancel}>
      <div ref={content} className={css.content}>
        <button onClick={closeModal}>&times;</button>
        <section>
          <h1>{capitalize(selectedPokemon.name)}</h1>
          <div>
            <div>
              <input type={"checkbox"} id={"isShiny"} onChange={handleChange} />
              <label htmlFor={"isShiny"} data-is-shiny={isShiny}>
                Shiny
              </label>
            </div>
            <p>{`#${selectedPokemon.id}`}</p>
          </div>
        </section>
        <section>
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
        <section>
          <p>
            <span>{"Type(s): "}</span>
            {selectedPokemon.types.map((type) => capitalize(type)).join(", ")}
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
