import { Button } from "./ui/button";
import favoriteIcon from "@/assets/favorite.svg";
import noFavoriteIcon from "@/assets/noFavorite.svg";

interface Props {
  isFavorito: boolean;
  onToggle: () => void;
}

export default function BotonFavorito({ isFavorito, onToggle }: Props) {
  return (
    <Button
        onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={isFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
      title={isFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
      size={"icon"}
    >
        <img
          src={isFavorito ? favoriteIcon : noFavoriteIcon}
          alt={isFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        />
    </Button>
  );
}