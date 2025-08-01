import type { IBorrowBookSummary } from "@/interfaces/borrowBooks/borrowBooks"
import type { ColumnDef } from "@tanstack/react-table"



export const Columns: ColumnDef<IBorrowBookSummary>[] = [
  {
    accessorKey: "book.title",
    header: "Title",
  },
  {
    accessorKey: "book.isbn",
    header: "ISBN",
  },
  {
    accessorKey: "totalQuantity",
    header: "Total Quantity",
  },
]
