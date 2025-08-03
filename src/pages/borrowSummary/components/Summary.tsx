import { useGetBorrowBooksSummaryQuery } from "@/redux/api/borrowBooks/borrowBooksApi";
import { Loader2 } from "lucide-react";
import { DataTable } from "./DataTable";
import { Columns } from "./Columns";

const Summary = () => {
  const { data:summary, isLoading, isError } = useGetBorrowBooksSummaryQuery()
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="animate-spin mr-2" /> Loading books...
      </div>
    )
  }

  if (isError || !summary?.data) {
    return (
      <div className="text-center text-red-500 mt-10">
        No books found.
      </div>
    )
  }
 
  
  return (
    <div>
      <div className="container mx-auto py-6 w-[80%]">
        <h2 className="text-2xl font-bold mb-4 text-center">Books Summary</h2>
        <DataTable columns={Columns} data={summary.data} />
      </div>
    </div>
  );
};

export default Summary;