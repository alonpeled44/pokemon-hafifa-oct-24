import Pokemon from "./pokemons";

const pokeAPI = "https://pokeapi.co/api/v2/";
const poke100 = `${pokeAPI}/pokemon?offset=0&limit=100`;
const typesAPI = `${pokeAPI}/type?offset=0&limit=21`;

async function fetchPokemonsAndTypes() {
  const poke100List = [];
  const typesList = [];
  try {
    const poke100Response = await fetch(poke100);
    if (!poke100Response.ok) {
      throw new Error("Couldn't catch 'em all :(");
    }
    const poke100Data = await poke100Response.json();

    const pokemonPromises = poke100Data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      if (!res.ok) {
        throw new Error("Couldn't catch that pokemon");
      }
      const pokeData = await res.json();
      const pokemonTypes = pokeData.types.map((type) => type.type.name);

      const newPokemon = new Pokemon(
        pokeData.name,
        pokeData.id.toString(),
        pokemonTypes,
        pokeData.sprites.front_default,
        pokeData.sprites.back_default,
        pokeData.sprites.front_shiny,
        pokeData.sprites.back_shiny,
        pokeData.height.toString(),
        pokeData.weight.toString()
      );
      poke100List.push(newPokemon);
    });

    await Promise.all(pokemonPromises);

    const pokeTypeRes = await fetch(typesAPI);
    if (!pokeTypeRes.ok) {
      throw new Error("Failed to fetch pokemon types");
    }
    const pokeTypesData = await pokeTypeRes.json();
    pokeTypesData.results.forEach((type) => typesList.push(type.name));

    return { poke100List, typesList };
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function initData() {
  const { poke100List, typesList } = await fetchPokemonsAndTypes();
  return { poke100List, typesList };
}
