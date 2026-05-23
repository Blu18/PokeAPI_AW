import { Button } from "./ui/button";

interface Props {
  isSelected: boolean;
  isFull: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

export default function BotonComparador({ isSelected, isFull, onAdd, onRemove, }: Props) {
  if (isSelected) {
    return (
      <Button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="text-xs px-2 py-1 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors font-medium">
        Comparando
      </Button>
    );
  }

  return (
    <Button onClick={(e) => { e.stopPropagation(); onAdd(); }} disabled={isFull}
      className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed"
      title={isFull ? "Ya hay dos Pokémon en el comparador" : "Agregar al comparador"}
    >
      Comparar
    </Button>
  );
}