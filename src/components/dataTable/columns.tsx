import type { Move } from "@/types/pokemon"
import type { ColumnDef } from "@tanstack/react-table" 
 
export const columns: ColumnDef<Move>[] = [
  {
    accessorFn: (row) => row.move.name,
    header: "Nombre",
  },
  {
    accessorFn: (row) => row.version_group_details[0].move_learn_method.name,
    header: "Aprendizaje",
  },
  {
    accessorFn: (row) => row.version_group_details[0].level_learned_at,
    header: "Nivel",
  },
]