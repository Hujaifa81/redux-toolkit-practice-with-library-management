import type { IBook } from "@/interfaces/books/books"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { BookOpen, MoreHorizontal, PenIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DeleteAlert from "./DeleteAlert"
import { Link } from "react-router-dom"



export const Columns = (
  onDelete: (_id: string) => void,

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
                <Button variant="ghost" size="sm" className="text-black w-full justify-start">
                  <Link to={`/books/${book._id}`}>
                    <div className="flex items-center text-green-500"><BookOpen className="h-4 w-4 mr-1" />See Details</div>
                  </Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>

                <Button variant="ghost" size="sm" className="text-black w-full justify-start">
                  <Link to={`/edit-book/${book._id}`}>
                    <div className="flex  items-center"><PenIcon className="h-4 w-4 mr-1" />Edit</div>
                  </Link>

                </Button>

              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <DeleteAlert onConfirm={() => onDelete(book._id)} bookTitle={book.title} />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>

                <Button variant="ghost" size="sm" className="text-black w-full justify-start">

                  <Link to={`/borrow/${book._id}`}>
                    <div className="flex  items-center text-blue-500"><BookOpen className="h-4 w-4 mr-1" />Borrow</div>
                  </Link>

                </Button>


              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
