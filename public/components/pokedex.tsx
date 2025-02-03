import { Component, useState } from "react";
import PokemonDialog from "./PokemonDialog";
import PokemonCard from "./PokemonCard";
import Pokemon from "../../pokemons";
import css from "../css/pokedex.module.css";

interface PokedexProps {
  pokemons: Pokemon[];
}

export default function Pokedex({ pokemons }: PokedexProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      <div className={css["cards-section"]}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => {
              setSelectedPokemon(pokemon);
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
