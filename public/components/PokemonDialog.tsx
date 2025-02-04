import { useEffect, useRef, useState } from "react";
import { useWindowWidth } from "../context/WindowWidthContext";
import Pokemon from "../../pokemons";
import css from "../css/pokemon-dialog.module.css";

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
interface Props {
  selectedPokemon: Pokemon;
  setIsDialogOpen: StateSetter<boolean>;
}

export default function PokemonDialog({
  selectedPokemon,
  setIsDialogOpen,
}: Props) {
  const dialog: React.RefObject<HTMLDialogElement> | null = useRef(null);
  const content: React.RefObject<HTMLDivElement> | null = useRef(null);

  const [isShiny, setIsShiny] = useState<boolean>(false);
  const windowWidth = useWindowWidth();

  const closeModal = () => {
    dialog.current.close();
    setIsDialogOpen(false);
  };

  useEffect(() => {
    dialog.current.showModal();

    const handleClick = (event: MouseEvent) => {
      if (!content.current.contains(event.target as HTMLElement)) {
        closeModal();
      }
    };

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
