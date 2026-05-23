import { useEffect, useMemo, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "@/components/SearchBar";
import FiltroDeTipo from "@/components/FitroDeTipo";
import { usePokemonList } from "@/hooks/useListaPokemon";
import { useFavoritosStore } from "@/storage/favoritoStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { PokemonCard as PokemonCardType } from "@/types/pokemon";
import { fetchPokemonByIds } from "@/services/pokeapi";
import MensajeEstado from "@/components/MensajeEstado";
import favoriteIcon from "@/assets/favorite.svg";

type Vista = "todos" | "favoritos";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const { pokemones, tipos, cargando, error } = usePokemonList(40, page, tipoSeleccionado);
  const { isFavorito, toggle, favoritos } = useFavoritosStore();
  const navigate = useNavigate();

  const [busqueda, setBusqeda] = useState("");
  const [vista, setVista] = useState<Vista>("todos");
  const [favoritosPokemon, setFavoritosPokemon] = useState<PokemonCardType[]>([]);

  useEffect(() => {
    const cargarFavoritos = async () => {
      if (vista !== "favoritos") {
        return;
      }

      const idsFavoritos = Object.keys(favoritos)
        .map(Number)
        .filter((id) => Number.isFinite(id));

      if (idsFavoritos.length === 0) {
        setFavoritosPokemon([]);
        return;
      }

      const cards = await fetchPokemonByIds(idsFavoritos);
      setFavoritosPokemon(cards);
    };

    void cargarFavoritos();
  }, [vista, favoritos]);

  const listaBase = vista === "favoritos" ? favoritosPokemon : pokemones;

  const filtrado = useMemo(() => {
    return listaBase.filter((p) => {
      const resultadosBusqueda = p.name.toLowerCase().includes(busqueda.toLowerCase().trim());
      const resultadosTipo = tipoSeleccionado === "" || p.types.includes(tipoSeleccionado);
      const resultadosFavorito = vista === "todos" || isFavorito(p.id);
      return resultadosBusqueda && resultadosTipo && resultadosFavorito 
    });
  }, [listaBase, busqueda, tipoSeleccionado, vista, favoritos, isFavorito])

  if (cargando) return <MensajeEstado estado="cargando" />;
  if (error) return <MensajeEstado estado="error" message={error} />;

  const favCount = Object.keys(favoritos).length;

  return (
    <>
      <header className="w-full flex flex-col">
          <div className="w-full flex flex-row p-4 items-center bg-secondary">
            <h1 className="flex flex-1 justify-center text-4xl font-bold text-secondary-foreground">Pokédex</h1>
          </div>
          <div className="bg-primary h-5"/>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1">
            <SearchBar value={busqueda} onChange={setBusqeda} />
          </div>
          <FiltroDeTipo
            tipos={tipos}
            seleccionado={tipoSeleccionado}
            onSelect={setTipoSeleccionado}
          />
        </div>

        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setVista("todos")}
            className={`pb-2 px-4 font-medium transition-colors ${
              vista === "todos"
                ? "border-b-2 border-red-500 text-red-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setVista("favoritos")}
            className={`pb-2 px-4 font-medium transition-colors ${
              vista === "favoritos"
                ? "border-b-2 border-red-500 text-red-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex flex-row gap-1">
              <img src={favoriteIcon} className="h-5 w-5" alt="Favoritos" /> 
              Favoritos {favCount > 0 && `(${favCount})`}
            </div>
          </button>
        </div>

        {filtrado.length === 0 ? (
          <MensajeEstado estado="vacio" message={vista === "favoritos" ? "Aun no tieness pokemons favoritos" : "No se encontraron pokemones"}/>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtrado.map((p) => (
              <PokemonCard
                key={p.id}
                pokemon={p}
                isFavorito={isFavorito(p.id)}
                onToggleFavorito={() => toggle(p.id)}
                onClick={() => navigate(`/pokemon/${p.id}`)}
              />
            ))}
          </div>
        )}
        {vista === "todos" && (
          <div className="flex gap-2 mt-6">
            {page > 1 && (
              <Button onClick={() => setPage(page - 1)}>{"<- Atras"}</Button>
            )}
            <Button onClick={() => setPage(page + 1)}>{"Siguiente ->"}</Button>
          </div>
        )}
      </main>
    </>
  );
}