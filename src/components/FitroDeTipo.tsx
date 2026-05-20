interface Props {
  tipos: string[];
  seleccionado: string;
  onSelect: (tipo: string) => void;
}

export default function FiltroDeTipo({ tipos, seleccionado, onSelect }: Props) {
  return (
    <select
      value={seleccionado}
      onChange={(e) => onSelect(e.target.value)}
      className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-red-400
                 text-gray-700 capitalize bg-white"
    >
      <option value="">Todos los tipos</option>
      {tipos.map((tipo) => (
        <option key={tipo} value={tipo} className="capitalize">
          {tipo}
        </option>
      ))}
    </select>
  );
}