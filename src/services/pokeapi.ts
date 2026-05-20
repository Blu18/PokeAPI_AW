import axios from "axios";
import type { PokemonListResponse, PokemonCard, Pokemon, TypeListResponse } from "@/types/pokemon";
import type { Specie } from "@/types/species";

const BASE_URL = "https://pokeapi.co/api/v2";

const getIdFromUrl = (url: string): number => {
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1]);
};

const getSpriteUrl = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;


export const fetchPokemonList = async ( limite = 40,  offset = 0 ): Promise<PokemonCard[]> => {
  const { data } = await axios.get<PokemonListResponse>(
    `${BASE_URL}/pokemon?limit=${limite}&offset=${offset}`
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

export const fetchPokemonListType = async ( limite = 40, offset = 0, tipo: string ): Promise<PokemonCard[]> => {
  const { data } = await axios.get(
    `${BASE_URL}/type/${tipo}/`
  );

  const pokemonSliced = data.pokemon.slice(offset, offset + limite);

  const cards = await Promise.all(
    pokemonSliced.map(async (item: any) => {
      const pokemon = item.pokemon;
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

const pokemonToCard = async (id: number): Promise<PokemonCard> => {
  const detail = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${id}`);
  return {
    id,
    name: detail.data.name,
    image: getSpriteUrl(id),
    types: detail.data.types.map((t: { type: { name: string } }) => t.type.name),
  };
};

export const fetchPokemonByIds = async (ids: number[]): Promise<PokemonCard[]> => {
  const uniqueIds = Array.from(new Set(ids));
  return Promise.all(uniqueIds.map((id) => pokemonToCard(id)));
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

export const fetchTypes = async (): Promise<string[]> => {
  const { data } = await axios.get<TypeListResponse>(`${BASE_URL}/type`);

  return data.results
    .map((t) => t.name)
};