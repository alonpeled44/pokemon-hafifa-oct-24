import { useState } from "react";
import PokemonDialog from "./PokemonDialog";
import PokemonCard from "./PokemonCard";
import css from "../css/pokedex.module.css";

export default function Pokedex({ pokeList }) {
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (event) => {
    setSelectedPokemon(
      pokeList.filter((poke) => poke.id === event.target.id)[0]
    );
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className={css["cards-section"]}>
        {pokeList.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} onClick={handleCardClick} />
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
