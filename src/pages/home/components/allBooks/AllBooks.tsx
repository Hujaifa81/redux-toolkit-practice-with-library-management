import { useDeleteBookMutation, useGetAllBooksQuery, useUpdateBookMutation } from "@/redux/api/books/booksApi"
import { Loader2 } from "lucide-react"
import { Columns } from "./Columns"
import { DataTable } from "./DataTable"
import { toast } from "sonner"
import type { IBook } from "@/interfaces/books/books"


const AllBooks = () => {
  const { data, isLoading, isError } = useGetAllBooksQuery({})
  const [deleteBook] = useDeleteBookMutation()
  const [updateBook]=useUpdateBookMutation()

  const handleDelete=async (id:string)=>{
    await deleteBook(id)
     toast.success("Book deleted successfully")
  }
  const handleEdit=async(book:Omit<IBook,"description" | "createdAt" | "updatedAt">)=>{
    await updateBook(book)
    toast.success("Book updated successfully")
  }
  const columns=Columns(
    handleEdit,
    handleDelete,
    (book) => console.log("Borrow", book)
  )
 
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="animate-spin mr-2" /> Loading books...
      </div>
    )
  }

  if (isError || !data?.data) {
    return (
      <div className="text-center text-red-500 mt-10">
        No books found.
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">All Books</h2>
      <DataTable columns={columns} data={data.data} />
    </div>
  )
}

export default AllBooks
