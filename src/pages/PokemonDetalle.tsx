import PokemonDetalleCard from "@/components/PokemonDetallesCard";
import { Button } from "@/components/ui/button";
import { getPokemon, getSpecie } from "@/services/pokeapi";
import type { Pokemon } from "@/types/pokemon";
import type { Specie } from "@/types/species";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PokemonDetalle() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [specie, setSpecie] = useState<Specie>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

      useEffect(() => {
        const load = async () => {
          try {
            setLoading(true);
            setError(null);
            const data = await getPokemon(id);
            setPokemon(data);
            const dataSpecie = await getSpecie(id);
            setSpecie(dataSpecie);
          } catch (err) {
            setError("No se pudieron cargar los Pokémon. Intenta de nuevo.");
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
        load();
      }, [id]);
    
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

    return <>
      <header className="w-full flex flex-col">
        <div className="w-full flex flex-row p-4 items-center bg-secondary">
          <Button onClick={() => navigate("/")}>
            {"<- Regresar"}
          </Button>
          <h1 className="flex flex-1 justify-center text-4xl font-bold text-secondary-foreground">Pokédex</h1>
        </div>
        <div className="bg-primary h-5"/>
      </header>
      <PokemonDetalleCard pokemon={ pokemon} specie={specie}></PokemonDetalleCard>
    </>
}