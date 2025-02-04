"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { initData } from "../poke-api";
import SearchTools from "../public/components/SearchTools";
import Pokedex from "../public/components/pokedex";
import Pokemon from "../pokemons";
import css from "../public/css/home-page.module.css";

interface PokemonData {
  poke100List: Pokemon[];
  typesList: string[];
}

export default function Index() {
  const router = useRouter();

  const [fullPokemons, setFullPokemons] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortMethod, setSortMethod] = useState<string>("Sort");
  const [searchValue, setSearchValue] = useState<string>("");

  const setData = async () => {
    const { poke100List, typesList }: PokemonData = await initData();
    setFullPokemons(poke100List);
    setTypes(typesList);
  };

  const fetchData = async () => {
    await setData();
    setIsLoading(false);
  };

  const sortList = (pokemons: Pokemon[], sortMethod: string) => {
    switch (sortMethod) {
      case "Id":
        return pokemons.sort((a, b) => a.id - b.id);
      case "Reversed":
        return pokemons.sort((a, b) => b.id - a.id);
      case "Name":
        return pokemons.sort((a, b) => a.name.localeCompare(b.name));
      case "Weight":
        return pokemons.sort((a, b) => a.weight - b.weight);
      case "Height":
        return pokemons.sort((a, b) => a.height - b.height);
      default:
        return pokemons.sort((a, b) => a.id - b.id);
    }
  };

  const pokemons = useMemo((): Pokemon[] => {
    return sortList(fullPokemons, sortMethod).filter((pokemon) => {
      const matchesFilter =
        selectedFilters.length === 0 ||
        pokemon.types.some((type) => selectedFilters.includes(type));

      const matchesSearch =
        pokemon.name.includes(searchValue.toLowerCase()) ||
        pokemon.id.toString().includes(searchValue) ||
        pokemon.weight.toString().includes(searchValue) ||
        pokemon.height.toString().includes(searchValue) ||
        (searchValue.startsWith("#") &&
          pokemon.id.toString() === searchValue.slice(1));

      return matchesFilter && matchesSearch;
    });
  }, [fullPokemons, sortMethod, selectedFilters, searchValue]);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("user") === null)
      router.push("/login");
    fetchData();
  }, []);

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
