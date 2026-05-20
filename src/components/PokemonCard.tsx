import { useNavigate } from "react-router-dom";
import { type PokemonCard } from "../types/pokemon";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { TYPE_COLORS } from "@/types/tipoColores";
import BotonFavorito from "./BotonFavorito";

interface Props {
  pokemon: PokemonCard;
  isFavorito: boolean;
  onToggleFavorito: () => void;
  onClick: () => void;   
}

export default function PokemonCard({ pokemon, isFavorito, onToggleFavorito, onClick }: Props) {
  const navigate = useNavigate();

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
        </CardFooter>
      </Card>
    </>
  );
}