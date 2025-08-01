import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { IBook } from "@/interfaces/books/books"
import {  Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"


const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    genre: z.string().min(1, "Genre is required").refine((val) => ["FICTION", "NON_FICTION", "HISTORY", "BIOGRAPHY", "FANTASY"].includes(val), {
        message: "Invalid genre",
    }),
   description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters long"),
    isbn: z.string().min(1, "ISBN is required"),
    copies: z.number().min(1, "Copies must be at least 1"),
    available: z.boolean(),
})

type FormInput = z.infer<typeof formSchema>


interface ICreateModalProps {
    handleCreateBook: (b:Omit<IBook,'_id'|'createdAt' | 'updatedAt'> ) => void;
}

const CreateBookModal = ({handleCreateBook}:ICreateModalProps) => {
    const [open,setOpen]=useState(false)
    const form = useForm<FormInput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            author: '',
            genre: '',
            isbn:'',
            copies:1,
            available: true,
            description:''
        },
    })

    const onSubmit = (values: FormInput) => {

        const book:Omit<IBook,'_id'|'createdAt' | 'updatedAt'> = {
            ...values,
            genre: values.genre as IBook["genre"],
           
        }
        handleCreateBook(book)
        setOpen(false)
        
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-black w-full justify-start">
                        <Plus /> Add Book
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Book</DialogTitle>
                        <DialogDescription>
                            Fill out the form below to add a new book.
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
                                                    const value = e.target.value ? Number(e.target.value):0;
                                                    field.onChange(value); 
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            
                            {/* description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Create</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateBookModal
