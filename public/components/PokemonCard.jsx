import { useState } from "react";
import PokemonDialog from "./PokemonDialog";
import css from "../css/pokemon-card.module.css";

export default function PokemonCard({ pokemon }) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div className={css.card} onClick={() => setOpenDialog(true)}>
        <section>
          <h2>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
          <p>{`#${pokemon.id}`}</p>
        </section>
        <section>
          <img src={pokemon.frontView} />
        </section>
        <section>
          <p>{`Type(s): ${pokemon.types
            .map((type) => type[0].toUpperCase() + type.slice(1))
            .join(", ")}`}</p>
          <p>{`Height: ${pokemon.height}`}</p>
          <p>{`Weight: ${pokemon.weight}`}</p>
        </section>
      </div>
      <PokemonDialog
        pokemon={pokemon}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}
