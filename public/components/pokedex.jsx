import { useEffect, useState } from "react";
import { initData } from "../../poke-api";
import PokemonCard from "./PokemonCard";
import css from "../css/pokedex.module.css";

export default function Pokedex() {
  const [pokeList, setPokeList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { poke100List, typesList } = await initData();
      setPokeList(poke100List);
      setTypeList(typesList);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <div className={css.wrapper}>
      <div className={css.background} />
      {isLoading && <h1 className={css.loading}>Loading...</h1>}
      <div className={css["cards-section"]}>
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[0]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[1]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[2]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[3]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[4]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[5]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[6]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[7]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[8]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[9]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[10]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[11]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[12]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[13]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[14]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[15]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[16]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[17]} />}
        {pokeList.length > 0 && <PokemonCard pokemon={pokeList[18]} />}
      </div>
    </div>
  );
}
