import PokemonCard from "./PokemonCard";
import css from "../css/pokedex.module.css";

export default function Pokedex({ isLoading, pokeList }) {
  return (
    <>
      {isLoading && <h1 className={css.loading}>Loading...</h1>}
      <div className={css["cards-section"]}>
        {pokeList.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))}
      </div>
    </>
  );
}
