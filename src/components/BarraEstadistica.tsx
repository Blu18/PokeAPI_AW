const STAT_MAX = 255;

const ColorDeBarra = (valor: number): string => {
  if (valor >= 100) return "bg-green-500"
  if (valor >= 60) return "bg-yellow-400"
  return "bg-red-400"
};

interface Props {
  nombre: string;
  valor: number;
  valorComparar?: number;
}

export default function BarraEstadistica({ nombre, valor, valorComparar }: Props) {
  const porcentaje = Math.round((valor / STAT_MAX) * 100);

  const colorBarra = valorComparar !== undefined
    ? valor > valorComparar
      ? "bg-green-500"
      : valor < valorComparar
        ? "bg-red-400"
        : "bg-gray-400"
    : ColorDeBarra(valor);

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-20 text-right text-gray-500 shrink-0">{nombre}</span>
      <span className="w-8 text-center font-semibold text-gray-700">{valor}</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorBarra}`}
          style={{ width: `${porcentaje}%` }}
        />
      </div>
    </div>
  );
}