import { useAddBookMutation } from "@/redux/api/books/booksApi";
import CreateBookModal from "./components/CreateBookModal";
import { toast } from "sonner";
import type { IBook } from "@/interfaces/books/books";

const CreateBook = () => {
    const [addBook]=useAddBookMutation()
    const handleCreateBook = async(bookData:Omit<IBook,'_id'|'createdAt' | 'updatedAt'>) => {
        try{
            await addBook(bookData).unwrap();
            toast.success("Book created successfully");
        }
        catch(error:unknown){
            toast.error("Failed to create book: " + (error as { data: { message: string } }).data.message);
        }
    }

    return (
        <div>
            <CreateBookModal handleCreateBook={(book:Omit<IBook,'_id'|'createdAt' | 'updatedAt'>)=>handleCreateBook(book)}/>
        </div>
    );
};

export default CreateBook;