"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initData } from "../poke-api";
import SearchTools from "../public/components/SearchTools";
import Pokedex from "../public/components/pokedex";
import css from "../public/css/home-page.module.css";

export default function Index() {
  const router = useRouter();

  const [pokemons, setpokemons] = useState([]);
  const [fullPokemons, setFullPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortMethod, setSortMethod] = useState("Sort");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("user") === null)
      router.push("/login");
    fetchData();
  }, [router]);

  const fetchData = async () => {
    const { poke100List, typesList } = await initData();
    setpokemons(poke100List.sort((a, b) => a.id - b.id));
    setFullPokemons(poke100List);
    setTypes(typesList);
    setIsLoading(false);
  };

  useEffect(() => {
    if (pokemons.length > 0) {
      let sortedList = [...pokemons];
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
      setpokemons(sortedList);
    }
  }, [sortMethod]);

  useEffect(() => {
    setpokemons(
      fullPokemons.filter((pokemon) => {
        const matchesFilter =
          selectedFilters.length === 0 ||
          pokemon.types.some((type) => selectedFilters.includes(type));

        const matchesSearch =
          pokemon.name.includes(searchValue.toLowerCase()) ||
          pokemon.id.includes(searchValue) ||
          pokemon.weight.includes(searchValue) ||
          pokemon.height.includes(searchValue) ||
          (searchValue.startsWith("#") && pokemon.id === searchValue.slice(1));

        return matchesFilter && matchesSearch;
      })
    );
  }, [selectedFilters, searchValue]);

  return (
    <main className={css.main}>
      {isLoading ? (
        <p className={css.loading}>Loading...</p>
      ) : (
        <>
          <SearchTools
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
            setSortMethod={setSortMethod}
            sortMethod={sortMethod}
            setSearchValue={setSearchValue}
            setTypes={setTypes}
            types={types}
          />
          <Pokedex pokemons={pokemons} />
        </>
      )}
    </main>
  );
}
