import { useState } from "react";
import PokemonDialog from "./PokemonDialog";
import PokemonCard from "./PokemonCard";
import css from "../css/pokedex.module.css";

export default function Pokedex({ pokemons }) {
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className={css["cards-section"]}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={(event) => {
              setSelectedPokemon(
                pokemons.filter((pokemon) => pokemon.id === event.target.id)[0]
              );
              setIsDialogOpen(true);
            }}
          />
        ))}
      </div>

      {isDialogOpen && (
        <PokemonDialog
          selectedPokemon={selectedPokemon}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </>
  );
}
