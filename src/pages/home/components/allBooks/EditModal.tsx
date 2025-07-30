
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { IBook, updatedBookObj } from "@/interfaces/books/books"
import { PenIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    genre: z.string().min(1, "Genre is required").refine((val) => ["FICTION", "NON_FICTION", "HISTORY", "BIOGRAPHY", "FANTASY"].includes(val), {
        message: "Invalid genre",
    }),
    isbn: z.string().min(1, "ISBN is required"),
    copies: z.number().min(0, "Copies must be at least 0"),
    available: z.boolean(),
})

type FormInput = z.infer<typeof formSchema>


interface IEditModalProps {
    book: IBook;
    onConfirm: (b: updatedBookObj) => void;
}

const EditModal = ({ book, onConfirm }: IEditModalProps) => {
    const form = useForm<FormInput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: book.title,
            author: book.author,
            genre: book.genre,
            isbn: book.isbn,
            copies: book.copies,
            available: book.available,
        },
    })

    const onSubmit = (values: FormInput) => {

        const updatedBook: updatedBookObj = {
            ...values,
            genre: values.genre as updatedBookObj["genre"],
            _id: book._id,
        }
        onConfirm(updatedBook)
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-black w-full justify-start">
                        <PenIcon /> Edit
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Book</DialogTitle>
                        <DialogDescription>
                            Make changes to the book details here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Title Field */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Author Field */}
                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Author</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Author" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Genre Field */}
                            <FormField
                                control={form.control}
                                name="genre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Genre</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={(value) => field.onChange(value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Genre" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="FICTION">Fiction</SelectItem>
                                                    <SelectItem value="NON_FICTION">Non_Fiction</SelectItem>
                                                    <SelectItem value="HISTORY">History</SelectItem>
                                                    <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                                                    <SelectItem value="FANTASY">Fantasy</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* ISBN Field */}
                            <FormField
                                control={form.control}
                                name="isbn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ISBN</FormLabel>
                                        <FormControl>
                                            <Input placeholder="ISBN" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Copies Field */}
                            <FormField
                                control={form.control}
                                name="copies"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Copies</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Number of Copies"
                                                type="number"
                                                value={field.value} 
                                                onChange={(e) => {
                                                    const value = e.target.value ? Number(e.target.value) : "";
                                                    field.onChange(value); 
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            {/* Available Field - Select for boolean */}
                            <FormField
                                control={form.control}
                                name="available"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Available</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(value === "true")}
                                                value={field.value ? "true" : "false"}
                                                disabled
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select availability" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="true">Yes</SelectItem>
                                                    <SelectItem value="false">No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditModal
