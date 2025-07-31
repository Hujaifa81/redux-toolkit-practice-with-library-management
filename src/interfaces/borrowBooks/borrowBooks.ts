import type { IBook } from "../books/books";

export interface IBorrowBook{
    book:string,
    _id:string,
    quantity:number,
    dueDate:Date,
    createdAt:Date,
    updatedAt:Date,
}
export interface IBorrowBookResponse {
    data: IBorrowBook;
    message: string;
    success: boolean;
}
export interface IBorrowBookSummary {
    book: Pick<IBook,'title'|'isbn'>;
    totalQuantity: number;
    _id:string;
}
export interface IBorrowBookSummaryResponse{
    data: IBorrowBookSummary[];
    message: string;
    success: boolean;
}

export interface IBorrowBookObj{
    book:string,
    quantity:number,
    dueDate:Date,
}