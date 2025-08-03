import Home from '@/pages/home/Home';
import MainLayout from '../layouts/MainLayout'
import { createBrowserRouter } from "react-router-dom";
import  CreateBook from '@/pages/create-book/CreateBook';
import BorrowSummary from '@/pages/borrowSummary/BorrowSummary';
import EditModal from '@/pages/home/components/allBooks/EditModal';
import BorrowModal from '@/pages/home/components/allBooks/BorrowModal';
import BookDetails from '@/pages/bookDetails/BookDetails';


export const router = createBrowserRouter([
    {
        path: "/",
        element:<MainLayout></MainLayout>,
        children:[
          {
            path:"/",
            element:<Home></Home>
          },
          {
            path:'/create-book',
            element:<CreateBook></CreateBook>
          },
          {
            path:"/borrow-summary",
            element:<BorrowSummary></BorrowSummary>
          },
          {
            path:"/edit-book/:id",
            element:<EditModal></EditModal>
          },
          {
            path:'/borrow/:id',
            element:<BorrowModal></BorrowModal>
          },
          {
            path:'books/:id',
            element:<BookDetails></BookDetails>
          }
        ]
  },
]);