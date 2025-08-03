export interface IBook {
    _id: string,
    createdAt: Date,
    updatedAt: Date,
    title: string,
    author: string,
    genre: "FICTION" | "NON_FICTION" | "HISTORY" | "BIOGRAPHY" | "FANTASY",
    isbn: string,
    description?: string,
    copies: number,
    available: boolean
}
export interface IBookResponse {
    data: IBook[];
    message: string;
    success: boolean;
}
export interface IBookResponseSingle {
    data: IBook;
    message: string;
    success: boolean;
}

export type updatedBookObj = Omit<IBook, "description" | "createdAt" | "updatedAt">