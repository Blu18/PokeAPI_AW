import { Input } from "./ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <Input type="text" value={ value } 
        onChange={(e) => onChange(e.target.value)} 
        placeholder="Buscar Pokemon por nombre" 
        className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-700 placeholder-gray-400" 
    />
  )
}