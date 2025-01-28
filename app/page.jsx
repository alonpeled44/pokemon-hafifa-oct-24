"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initData } from "../poke-api";
import SearchTools from "../public/components/SearchTools";
import Pokedex from "../public/components/pokedex";
import css from "../public/css/home-page.module.css";

export default function Index() {
  const router = useRouter();

  const [pokeList, setPokeList] = useState([]);
  const [fullPokeList, setFullPokeList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filterList, setFilterList] = useState([]);
  const [sortMethod, setSortMethod] = useState();
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("user") === null)
      router.replace("/login");

    const fetchData = async () => {
      setIsLoading(true);
      const { poke100List, typesList } = await initData();
      setPokeList([...poke100List].sort((a, b) => a.id - b.id));
      setFullPokeList([...poke100List]);
      setTypeList([...typesList]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    switch (sortMethod) {
      case "Id":
        setPokeList((prev) => [...prev].sort((a, b) => a.id - b.id));
        break;
      case "Reversed":
        setPokeList((prev) => [...prev].sort((a, b) => b.id - a.id));
        break;
      case "Name":
        setPokeList((prev) =>
          [...prev].sort((a, b) => a.name.localeCompare(b.name))
        );
        break;
      case "Weight":
        setPokeList((prev) => [...prev].sort((a, b) => a.weight - b.weight));
        break;
      case "Height":
        setPokeList((prev) => [...prev].sort((a, b) => a.height - b.height));
        break;
    }
  }, [sortMethod]);

  useEffect(() => {
    if (filterList.length === 0) setPokeList(fullPokeList);
    else
      setPokeList(
        fullPokeList.filter((pokemon) =>
          pokemon.types.some((type) => filterList.includes(type))
        )
      );
  }, [filterList]);

  return (
    <main className={css.main}>
      <SearchTools
        setFilterList={setFilterList}
        filterList={filterList}
        setSortMethod={setSortMethod}
        setSearchValue={setSearchValue}
        typeList={typeList}
      />
      <Pokedex isLoading={isLoading} pokeList={pokeList} />
    </main>
  );
}
