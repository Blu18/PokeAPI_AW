import type { Pokemon } from "@/types/pokemon";
import { TYPE_COLORS } from "@/types/tipoColores";
import BarraEstadistica from "./BarraEstadistica"
import { Button } from "./ui/button";

interface Props {
  pokemon1: Pokemon;
  pokemon2: Pokemon | null;
  onRemove: () => void;
}

export default function ColumnaComparador({ pokemon1, pokemon2, onRemove }: Props) {
  const statMap = pokemon2
    ? Object.fromEntries(pokemon2.stats.map((s) => [s.stat.name, s.base_stat]))
    : null;

  return (
    <div className="flex flex-col items-center gap-4 bg-white rounded-2xl shadow-md p-6 flex-1">
      <div className="flex justify-between w-full items-start">
        <span className="text-xs text-gray-400">
          #{pokemon1.id}
        </span>
        <Button onClick={onRemove} className="text-gray-400 hover:text-red-500 transition-colors text-lg leading-none" title="Quitar del comparador" >
          ✕
        </Button>
      </div>

      <img src={pokemon1.sprites.other?.["official-artwork"].front_default} alt={pokemon1.name} className="w-32 h-32 object-contain" />

      <h2 className="capitalize font-bold text-xl text-gray-800">
        {pokemon1.name}
      </h2>
      <div className="flex gap-1 flex-wrap justify-center">
        {pokemon1.types.map((tipo) => (
          <span
            key={tipo.type.name}
            className={`text-white text-xs px-2 py-0.5 rounded-full capitalize ${TYPE_COLORS[tipo.type.name] ?? "bg-gray-400"
              }`}
          >
            {tipo.type.name}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 w-full text-center">
        <div className="bg-gray-50 rounded-xl p-2">
          <p className="text-xs text-gray-400">Altura</p>
          <p className="font-semibold">{(pokemon1.height / 10).toFixed(1)} m</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-2">
          <p className="text-xs text-gray-400">Peso</p>
          <p className="font-semibold">{(pokemon1.weight / 10).toFixed(1)} kg</p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 mt-2">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Estadísticas base
        </h3>
        {pokemon1.stats.map((stat) => (
          <BarraEstadistica key={stat.stat.name} nombre={stat.stat.name} valor={stat.base_stat} valorComparar={statMap?.[stat.stat.name]} />
        ))}
      </div>
    </div>
  );
}