"use client";

import { useEffect, useState, useMemo } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { initData } from "../poke-api";
import SearchTools from "../public/components/SearchTools";
import Pokedex from "../public/components/pokedex";
import Pokemon from "../pokemons";
import css from "../public/css/home-page.module.css";

export default function Index() {
  const router: AppRouterInstance = useRouter();

  const [fullPokemons, setFullPokemons] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortMethod, setSortMethod] = useState<string>("Sort");
  const [searchValue, setSearchValue] = useState<string>("");

  const setData = async (): Promise<void> => {
    const { poke100List, typesList } = await initData();
    setFullPokemons(poke100List);
    setTypes(typesList);
  };

  const fetchData = async (): Promise<void> => {
    await setData();
    setIsLoading(false);
  };

  const sortList = (pokemons: Pokemon[], sortMethod: string): Pokemon[] => {
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

  const pokemons: Pokemon[] = useMemo((): Pokemon[] => {
    return sortList(fullPokemons, sortMethod).filter((pokemon: Pokemon) => {
      const matchesFilter: boolean =
        selectedFilters.length === 0 ||
        pokemon.types.some((type: string) => selectedFilters.includes(type));

      const matchesSearch: boolean =
        pokemon.name.includes(searchValue.toLowerCase()) ||
        pokemon.id.includes(searchValue) ||
        pokemon.weight.includes(searchValue) ||
        pokemon.height.includes(searchValue) ||
        (searchValue.startsWith("#") && pokemon.id === searchValue.slice(1));

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
