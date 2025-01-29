import PokemonCard from "./PokemonCard";
import css from "../css/pokedex.module.css";

export default function Pokedex({ pokeList }) {
  return (
    <>
      <div className={css["cards-section"]}>
        {pokeList.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))}
      </div>
    </>
  );
}
