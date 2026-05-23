import { useComparadorStore } from "@/storage/comparadorStore";
import ComparatorColumn from "../components/ColumnaComparador";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ComparatorPage() {
    const { slots, remove, clear } = useComparadorStore();
    const navigate = useNavigate();

    const [izq, der] = slots;
    const isEmpty = izq === null && der === null;

    return (
        <>
            <header className="w-full flex flex-col">
                <div className="w-full flex flex-row p-4 items-center bg-secondary">
                    <Button onClick={() => navigate("/")}>
                        {"<- Regresar"}
                    </Button>
                    <h1 className="flex flex-1 justify-center text-4xl font-bold text-secondary-foreground">Pokédex</h1>
                </div>
                <div className="bg-primary h-5" />
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Comparador</h1>
                    <Button variant={"outline"} onClick={clear}
                        disabled={isEmpty} className="text-sm text-red-400 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        Limpiar
                    </Button>
                </div>

                {isEmpty && (
                    <div className="text-center py-16">
                        <p className="text-lg">
                            Selecciona dos Pokémon desde el listado para compararlos.
                        </p>
                        <Button onClick={() => navigate("/")} className="mt-4 px-5 py-2 bg-red-500 text-white rounded-xl
                        hover:bg-red-600 transition-colors font-medium"
                        >
                            Ir al listado
                        </Button>
                    </div>
                )}

                {!isEmpty && (
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        {izq ? (
                            <ComparatorColumn
                                pokemon1={izq}
                                pokemon2={der}
                                onRemove={() => remove(izq.id)}
                            />
                        ) : (
                            <EmptySlot onNavigate={() => navigate("/")} />
                        )}

                        <div className="flex items-center justify-center sm:pt-36">
                            <span className="text-2xl font-black text-gray-300">VS</span>
                        </div>
                        {der ? (
                            <ComparatorColumn pokemon1={der} pokemon2={izq} onRemove={() => remove(der.id)} />
                        ) : (
                            <EmptySlot onNavigate={() => navigate("/")} />
                        )}
                    </div>
                )}
            </main>
        </>
    );
}

function EmptySlot({ onNavigate }: { onNavigate: () => void }) {
    return (
        <div
            onClick={onNavigate}
            className="flex-1 flex flex-col items-center justify-center gap-3
                 border-2 border-dashed border-gray-300 rounded-2xl p-10
                 cursor-pointer hover:border-red-400 hover:bg-red-50
                 transition-colors min-h-75"
        >
            <span className="text-4xl">+</span>
            <p className="text-gray-400 text-sm">Elegir Pokémon</p>
        </div>
    );
}