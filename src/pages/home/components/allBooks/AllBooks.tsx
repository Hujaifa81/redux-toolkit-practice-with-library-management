import { useDeleteBookMutation, useGetAllBooksQuery, useUpdateBookMutation } from "@/redux/api/books/booksApi"
import { Loader2 } from "lucide-react"
import { Columns } from "./Columns"
import { DataTable } from "./DataTable"
import { toast } from "sonner"
import type { IBook } from "@/interfaces/books/books"
import type { IBorrowBookObj } from "@/interfaces/borrowBooks/borrowBooks"
import { useAddBorrowBookMutation } from "@/redux/api/borrowBooks/borrowBooksApi"


const AllBooks = () => {
  const { data, isLoading, isError, refetch: refetchBooks } = useGetAllBooksQuery({})
  const [deleteBook] = useDeleteBookMutation()
  const [updateBook] = useUpdateBookMutation()
  const [borrowBook] = useAddBorrowBookMutation()

  const handleDelete = async (id: string) => {
    await deleteBook(id)
    toast.success("Book deleted successfully")
  }
  const handleEdit = async (book: Omit<IBook, "description" | "createdAt" | "updatedAt">) => {
    await updateBook(book)
    toast.success("Book updated successfully")
  }
  const handleBorrow = async (book: IBorrowBookObj) => {
    try {
       await borrowBook(book).unwrap(); 
      refetchBooks();
        
      toast.success("Book borrowed successfully");
    } catch (error: unknown) {
      if (error && (error as { data?: { message?: string } }).data?.message) {
        toast.error("Failed to borrow book: " + (error as { data: { message: string } }).data.message);
      } else {
     
        toast.error("Failed to borrow book");
      }
    }
  };


  const columns = Columns(
    handleEdit,
    handleDelete,
    handleBorrow
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
