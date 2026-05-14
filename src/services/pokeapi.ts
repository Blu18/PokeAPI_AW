import axios from "axios";
import type { PokemonListResponse, PokemonCard, Pokemon } from "../types/pokemon";
import type { Specie } from "@/types/species";

const BASE_URL = "https://pokeapi.co/api/v2";

const getIdFromUrl = (url: string): number => {
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1]);
};

const getSpriteUrl = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;


export const fetchPokemonList = async ( limit = 30,  offset = 0 ): Promise<PokemonCard[]> => {
  const { data } = await axios.get<PokemonListResponse>(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  const cards = await Promise.all(
    data.results.map(async (pokemon) => {
      const id = getIdFromUrl(pokemon.url);
      const detail = await axios.get(`${BASE_URL}/pokemon/${id}`);
      const types: string[] = detail.data.types.map(
        (t: { type: { name: string } }) => t.type.name
      );
      return {
        id,
        name: pokemon.name,
        image: getSpriteUrl(id),
        types,
      };
    })
  );

  return cards;
};

export const getPokemon = async (id: string | undefined): Promise<Pokemon> => {
  if (!id) throw new Error("El id del pokemon es obligatorio");

  const { data } = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${id}`);
  return data;
}

export const getSpecie = async (id: string | undefined): Promise<Specie> => {
  if (!id) throw new Error("El id del pokemon es obligatorio");

  const { data } = await axios.get<Specie>(`${BASE_URL}/pokemon-species/${id}`);
  return data;
}