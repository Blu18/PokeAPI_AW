import type { Pokemon } from "@/types/pokemon";
import { Card, CardContent, CardHeader } from "./ui/card";
import type { Specie } from "@/types/species";
import { TYPE_COLORS } from "@/types/tipoColores";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { DataTable } from "./dataTable/DataTable";
import { columns } from "./dataTable/columns";

interface Props {
    pokemon?: Pokemon | null
    specie?: Specie | null
}

export default function PokemonDetalleCard({ pokemon, specie }: Props) {
    if (!pokemon || !specie) return null

    return (
        <>
            <Card className="shadow-md w-full">
                <CardContent className="grid grid-flow-col grid-rows-6  grid-cols-3 self-center gap-4">
                    <div className="row-start-1 row-span-2 col-satrt-1 col-span-1 flex flex-col items-center justify-center gap-2">
                        <img src={pokemon.sprites.other?.["official-artwork"].front_default} alt={pokemon.name} className="w-64 h-64" loading="lazy" />
                        <div className="flex flex-wrap justify-center gap-1 mt-2">
                            {pokemon.types.map((type) => (
                            <span key={type.type.name} className={`text-white text-xs font-medium px-2 py-0.5 rounded-full capitalize ${ TYPE_COLORS[type.type.name] ?? "bg-gray-400" }`} >
                                {type.type.name}
                            </span>
                            ))}
                        </div>
                    </div>
                    <div className="row-start-1 row-span-1 col-start-2 col-span-2">
                        <p>#{pokemon.id}</p>
                        <h3 className="capitalize font-bold text-2xl">{pokemon.name}</h3>
                        <p>{specie.flavor_text_entries[0].flavor_text}</p>
                    </div>
                    <Card className="row-start-2 col-span-2 row-span-1">
                        <CardHeader>
                            <p className="font-bold text-lg">Datos Generales</p>
                        </CardHeader>
                        <CardContent className="flex flex-row gap-10">
                            <div>
                                <p className="font-semibold">Altura:</p>
                                <p>{pokemon.height / 10} m.</p>
                            </div>
                            <div>
                                <p className="font-semibold">Peso:</p>
                                <p>{pokemon.weight / 10} kg.</p>
                            </div>
                            <div>
                                <p className="font-semibold">Habilidades:</p>
                                {pokemon.abilities.map((ability) => ( <p className="capitalize">{ability.ability?.name}</p>))}
                            </div>
                            <div>
                                <p className="font-semibold">Forma:</p>
                                <p className="capitalize">{specie.shape.name}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Color:</p>
                                <p className="capitalize">{specie.color.name}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="row-start-3 col-start-1 row-span-2">
                        <CardHeader className="font-bold text-lg">
                            Stats
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    {pokemon.stats.map((stat) => (
                                        <TableRow>
                                            <TableCell className="capitalize">
                                                {stat.stat.name}
                                            </TableCell>
                                            <TableCell className="capitalize text-right">
                                                {stat.base_stat}
                                            </TableCell>
                                        </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card className="row-start-3 col-start-2 col-span-4 row-span-2">
                        <CardHeader className="font-bold text-lg">
                            Movimientos
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={columns} data={pokemon.moves}></DataTable>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </>
    )
}