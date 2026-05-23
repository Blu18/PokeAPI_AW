import { useNavigate, useLocation } from "react-router-dom";
import { useComparadorStore } from "@/storage/comparadorStore";
import { Button } from "./ui/button";

export default function ComparatorFAB() {
  const { slots } = useComparadorStore();
  const navigate = useNavigate();
  const location = useLocation();

  const count = slots.filter(Boolean).length;

  // No mostrar el FAB en la página del comparador
  if (location.pathname === "/comparador" || count === 0) return null;

  return (
    <Button onClick={() => navigate("/comparador")}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2
        bg-red-500 text-white px-4 py-3 rounded-2xl shadow-lg
        hover:bg-red-600 transition-all hover:scale-105 font-semibold"
    >
      <span>Comparar</span>
      <span className="bg-white text-red-500 rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
        {count}
      </span>
    </Button>
  );
}