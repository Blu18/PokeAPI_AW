import { type PokemonCard } from "../types/pokemon";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

// Colores por tipo para visual básico (bonus: diseño por colores)
const TYPE_COLORS: Record<string, string> = {
  fire: "bg-orange-400",
  water: "bg-blue-400",
  grass: "bg-green-400",
  electric: "bg-yellow-400",
  psychic: "bg-pink-400",
  ice: "bg-cyan-300",
  dragon: "bg-indigo-500",
  dark: "bg-gray-700",
  fairy: "bg-pink-300",
  normal: "bg-gray-400",
  fighting: "bg-red-600",
  flying: "bg-sky-300",
  poison: "bg-purple-400",
  ground: "bg-yellow-600",
  rock: "bg-yellow-800",
  bug: "bg-lime-500",
  ghost: "bg-violet-600",
  steel: "bg-slate-400",
};

interface Props {
  pokemon: PokemonCard;
}

export default function PokemonCard({ pokemon }: Props) {
  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardDescription>
            #{pokemon.id}
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full max-w-sm flex flex-col items-center">
          <img src={pokemon.image} alt={pokemon.name} className="w-28 h-28" loading="lazy" />
          <p className="capitalize font-semibold text-gray-800">{pokemon.name}</p>
        </CardContent>
        <CardFooter className="gap-1">
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