import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "@/redux/api/books/booksApi";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"
import { useEffect } from "react";

const Details = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError, refetch } = useGetBookByIdQuery(id as string);
    useEffect(() => {
        refetch()
    }, [refetch])

    if (isLoading) return <div className="flex items-center justify-center py-20 text-muted-foreground"><Loader2 className="animate-spin mr-2" /> Loading...</div>;


    if (isError || !data?.data) return <div className="text-center text-red-500 mt-10">Error: Unable to load book details</div>;

    const book = data.data;
    

    return (
        <div className="container mx-auto py-6 space-y-6">
            {/* Book Title */}
            <h2 className="text-3xl font-bold text-center">{book.title}</h2>

            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
                {/* Book Details */}
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-xl font-medium text-gray-700">Author</h3>
                            <p className="text-gray-500">{book.author}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium text-gray-700">Genre</h3>
                            <p className="text-gray-500">{book.genre}</p>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-xl font-medium text-gray-700">ISBN</h3>
                            <p className="text-gray-500">{book.isbn}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium text-gray-700">Copies Available</h3>
                            <p className="text-gray-500">{book.copies}</p>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-xl font-medium text-gray-700">Available</h3>
                            <p className="text-gray-500">{book.available ? "Yes" : "No"}</p>
                        </div>

                    </div>

                    {/* Book Description */}
                    <div>
                        <h3 className="text-xl font-medium text-gray-700">Description</h3>
                        <p className="text-gray-500">{book.description || "No description available."}</p>
                    </div>
                </div>

                {/* Borrow/Back Buttons */}
                <div className="mt-6 flex justify-between">
                    <Button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                        <Link to={`/borrow/${book._id}`}>
                            Borrow Book
                        </Link>
                    </Button>


                </div>
            </div>
        </div>
    );
};

export default Details;
