import { useRouter } from "next/navigation";
import PokemonCard from "./PokemonCard";
import css from "../css/pokedex.module.css";

export default function Pokedex({ isLoading, pokeList }) {
  const router = useRouter();

  const generateCards = () => {
    try {
      return pokeList.map((poke) => (
        <PokemonCard key={poke.id} pokemon={poke} />
      ));
    } catch {
      router.refresh();
    }
    /* I had an error one time that generated each card 3 times 
    and said that there were element with the same key and refreshing the page 
    (re-fetching) solved it so... yeah.*/
  };
  return (
    <>
      {isLoading && <h1 className={css.loading}>Loading...</h1>}
      <div className={css["cards-section"]}>{generateCards()}</div>
    </>
  );
}
