import { useEffect, useState } from "react";
import { fetchPokemonList, fetchPokemonListType, fetchTypes } from "../services/pokeapi";
import type { PokemonCard } from "../types/pokemon";

export function usePokemonList(limite = 40, pag = 1, tipo = "" ) {
  const [pokemones, setPokemons] = useState<PokemonCard[]>([]);
  const [tipos, setTipos] = useState<string[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setCargando(true);
        setError(null);
        const offset = (pag - 1) * limite;
        const [pokemonData, typesData] = await Promise.all([
          tipo !== "" ? fetchPokemonListType(limite, offset, tipo) : fetchPokemonList(limite, offset),
          fetchTypes(),
        ]);
        setPokemons(pokemonData);
        setTipos(typesData);
      } catch (err) {
        setError("Error al cargar los datos");
        console.error(err);
      } finally {
        setCargando(false);
      }
    };
    load();
  }, [limite, pag, tipo]);

  return { pokemones, tipos, cargando, error };
}