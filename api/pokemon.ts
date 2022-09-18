import axios from "axios";
import { PokemonData } from "../type";

const apiInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

type FetchPokemonsParams = {
  limit: number;
  offset: number;
};

export function fetchPokemons(
  params: FetchPokemonsParams = { limit: 10000000, offset: 0 }
) {
  return apiInstance.get("/pokemon", { params });
}

export function fetchPokemonDetail(name: string, params?: FetchPokemonsParams) {
  return apiInstance.get("/pokemon/" + name, { params });
}

export async function searchPokemon(q: string) {
  const pokemons: PokemonData = (await fetchPokemons()).data.results;
  return pokemons.filter((item) => item.name.search(new RegExp(q, "i")) !== -1);
}
