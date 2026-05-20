import hourglassIcon from "@/assets/hourglass-solid-full.svg";
import errorIcon from "@/assets/triangle-exclamation-solid-full.svg";
import magnifyIcon from "@/assets/magnifying-glass-solid-full.svg";

type Estado = "cargando" | "error" | "vacio";

interface Props {
  estado: Estado;
  message?: string;
}

const DEFAULTS: Record<Estado, string> = {
  cargando: "Cargando Pokémon...",
  error: "Ocurrió un error al cargar los datos.",
  vacio: "No se encontraron Pokémon.",
};

export default function MensajeEstado({ estado, message }: Props) {
  const text = message ?? DEFAULTS[estado];

  const estilos: Record<Estado, string> = {
    cargando: "text-gray-500 animate-pulse",
    error: "text-red-500",
    vacio: "text-gray-400",
  };

  const iconos: Record<Estado, string> = {
    cargando: hourglassIcon,
    error: errorIcon,
    vacio: magnifyIcon,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3">
      <img src={iconos[estado]} alt={text} className="h-12 w-12" />
      <p className={`text-lg font-medium ${estilos[estado]}`}>{text}</p>
    </div>
  );
}