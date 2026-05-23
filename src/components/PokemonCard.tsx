import { useNavigate } from "react-router-dom";
import { type PokemonCard } from "../types/pokemon";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { TYPE_COLORS } from "@/types/tipoColores";
import BotonFavorito from "./BotonFavorito";
import BotonComparador from "./BotonComparador";
import { useComparadorStore } from "@/storage/comparadorStore";
import { getPokemon } from "@/services/pokeapi";

interface Props {
  pokemon: PokemonCard;
  isFavorito: boolean;
  onToggleFavorito: () => void;
  onClick: () => void;   
}

export default function PokemonCard({ pokemon, isFavorito, onToggleFavorito, onClick }: Props) {
  const navigate = useNavigate();

  const { add, remove, isSelected, slots } = useComparadorStore();
  const isFull = slots[0] !== null && slots[1] !== null;

  const handleAddToComparator = async () => {
    if (isFull) {
      navigate("/comparador");
      return;
    }

    // Si ya está seleccionado, quítalo
    if (isSelected(pokemon.id)) {
      remove(pokemon.id);
      return;
    }
    // Si no, pide el detalle completo y añádelo
    try {
      const detail = await getPokemon(String(pokemon.id));
      add(detail);
    } catch (err) {
      console.error("Error al agregar al comparador:", err);
    }
  };

  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <div className="w-full max-w-sm flex items-start justify-between">
            <span className="text-sm text-gray-500">#{pokemon.id}</span>
            <div className="shrink-0" onClick={onClick}>
              <BotonFavorito isFavorito={isFavorito} onToggle={onToggleFavorito} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="w-full max-w-sm flex flex-col items-center">
          <Button variant={"ghost"} size={"lg"} className="h-full flex flex-col" onClick={() => navigate(`/detalles-pokemon/${pokemon.id}`)}>
            <img src={pokemon.image} alt={pokemon.name} className="w-28 h-28" loading="lazy" />
            <p className="capitalize font-semibold text-gray-800">{pokemon.name}</p>
          </Button>
        </CardContent>
        <CardFooter className="gap-1 self-center">
          {pokemon.types.map((type) => (
          <span
            key={type}
            className={`text-white text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
              TYPE_COLORS[type] ?? "bg-gray-400"
            }`}
          >
            {type}
          </span>
        ))}
        <div>
          <BotonComparador isSelected={isSelected(pokemon.id)} isFull={isFull && !isSelected(pokemon.id)} onAdd={handleAddToComparator} onRemove={() => remove(pokemon.id)}/>
        </div>
        </CardFooter>
      </Card>
    </>
  );
}