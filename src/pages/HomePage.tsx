import { useEffect, useState } from "react";
import { fetchPokemonList } from "../services/pokeapi";
import PokemonCard from "../components/PokemonCard";
import type { PokemonCard as PokemonCardType } from "../types/pokemon";

export default function HomePage() {
  const [pokemon, setPokemon] = useState<PokemonCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPokemonList(20);
        setPokemon(data);
      } catch (err) {
        setError("No se pudieron cargar los Pokémon. Intenta de nuevo.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Cargando Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <>
      <header className="w-full flex flex-col">
          <div className="w-full flex flex-row p-4 items-center bg-secondary">
            <h1 className="flex flex-1 justify-center text-4xl font-bold text-secondary-foreground">Pokédex</h1>
          </div>
          <div className="bg-primary h-5"/>
        </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {pokemon.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      </main>
    </>
  );
}