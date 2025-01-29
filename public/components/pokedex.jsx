import { useState } from "react";
import PokemonDialog from "./PokemonDialog";
import PokemonCard from "./PokemonCard";
import css from "../css/pokedex.module.css";

export default function Pokedex({ pokeList }) {
  const [clickedCardID, setClickedCardID] = useState();

  const handleCardClick = (event) => {
    setClickedCardID(event.target.id);
  };

  return (
    <>
      <div className={css["cards-section"]}>
        {pokeList.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} onClick={handleCardClick} />
        ))}
      </div>
      <PokemonDialog pokeList={pokeList} clickedCardID={clickedCardID} />
    </>
  );
}
