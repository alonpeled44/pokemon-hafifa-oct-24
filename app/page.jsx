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
  const [sortMethod, setSortMethod] = useState("Sort");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("user") === null)
      router.push("/login");
    fetchData();
  }, [router]);

  const fetchData = async () => {
    const { poke100List, typesList } = await initData();
    setPokeList(poke100List.sort((a, b) => a.id - b.id));
    setFullPokeList(poke100List);
    setTypeList(typesList);
    setIsLoading(false);
  };

  useEffect(() => {
    if (pokeList.length > 0) {
      let sortedList = [...pokeList];
      switch (sortMethod) {
        case "Id":
          sortedList.sort((a, b) => a.id - b.id);
          break;
        case "Reversed":
          sortedList.sort((a, b) => b.id - a.id);
          break;
        case "Name":
          sortedList.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "Weight":
          sortedList.sort((a, b) => a.weight - b.weight);
          break;
        case "Height":
          sortedList.sort((a, b) => a.height - b.height);
          break;
        default:
          break;
      }
      setPokeList(sortedList);
    }
  }, [sortMethod]);

  useEffect(() => {
    setPokeList(
      fullPokeList.filter((pokemon) => {
        const matchesFilter =
          filterList.length === 0 ||
          pokemon.types.some((type) => filterList.includes(type));

        const matchesSearch =
          pokemon.name.includes(searchValue.toLowerCase()) ||
          pokemon.id.includes(searchValue) ||
          pokemon.weight.includes(searchValue) ||
          pokemon.height.includes(searchValue) ||
          (searchValue.startsWith("#") && pokemon.id === searchValue.slice(1));

        return matchesFilter && matchesSearch;
      })
    );
  }, [filterList, searchValue]);

  return (
    <main className={css.main}>
      {isLoading ? (
        <p className={css.loading}>Loading...</p>
      ) : (
        <>
          <SearchTools
            setFilterList={setFilterList}
            filterList={filterList}
            setSortMethod={setSortMethod}
            sortMethod={sortMethod}
            setSearchValue={setSearchValue}
            typeList={typeList}
          />
          <Pokedex pokeList={pokeList} />
        </>
      )}
    </main>
  );
}
