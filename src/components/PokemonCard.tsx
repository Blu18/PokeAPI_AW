import { useNavigate } from "react-router-dom";
import { type PokemonCard } from "../types/pokemon";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "./ui/card";
import { TYPE_COLORS } from "@/types/tipoColores";

interface Props {
  pokemon: PokemonCard;
}

export default function PokemonCard({ pokemon }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardDescription>
            #{pokemon.id}
          </CardDescription>
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