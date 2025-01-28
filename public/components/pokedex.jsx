import PokemonCard from "./PokemonCard";
import css from "../css/pokedex.module.css";

export default function Pokedex({ pokeList }) {
  return (
    <>
      <div className={css["cards-section"]}>
        {pokeList.map((poke, index) => (
          <PokemonCard key={poke.id * index} pokemon={poke} />
        ))}
      </div>
    </>
  );
}
