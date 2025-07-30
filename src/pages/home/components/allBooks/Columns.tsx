// components/books/Columns.tsx
import type { IBook } from "@/interfaces/books/books"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DeleteAlert from "./DeleteAlert"
import EditModal from "./EditModal"


export const Columns = (
  onEdit: (book: Omit<IBook, "description" | "createdAt" | "updatedAt">) => void,
  onDelete: (_id: string) => void,
  onBorrow: (book: IBook) => void
): ColumnDef<IBook>[] => [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
  },
  {
    accessorKey: "copies",
    header: "Copies",
  },
  {
    accessorKey: "available",
    header: "Available",
    cell: ({ row }) => (row.original.available ? "Yes" : "No"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const book = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <EditModal onConfirm={(b) => onEdit(b)} book={book} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteAlert onConfirm={() => onDelete(book._id)} bookTitle={book.title} />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onBorrow(book)} className="text-blue-600">
              Borrow
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
