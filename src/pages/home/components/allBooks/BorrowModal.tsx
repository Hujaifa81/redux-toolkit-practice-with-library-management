
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { IBook } from "@/interfaces/books/books"
import { BookOpen, CalendarIcon } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import type { IBorrowBookObj } from "@/interfaces/borrowBooks/borrowBooks"


const getFormSchema = (availableCopies: number) =>
    z.object({
        title: z.string().min(1, "Title is required"),
        quantity: z
            .number()
            .min(1, "Copies must be at least 1")
            .refine((val) => val > 0, {
                message: "Quantity cannot be empty or zero",
            })
            .max(availableCopies, { message: "Not enough copies available." }),
        dueDate: z.date().refine((val) => val !== undefined, {
                message: "Due date is required",
            })
    });

type FormInput = z.infer<ReturnType<typeof getFormSchema>>;


interface IBorrowModalProps {
    book: IBook;
    onConfirm: (b: IBorrowBookObj) => void

}

const BorrowModal = ({ book, onConfirm }: IBorrowModalProps) => {
    const schema = getFormSchema(book.copies);
    const form = useForm<FormInput>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: book.title,
            quantity: 1,
            dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
            
        },
    })
    const onSubmit = (values: FormInput) => {
        const borrowBook: IBorrowBookObj = {
            book: book._id,
            quantity: values.quantity,
            dueDate: values.dueDate,
        };
        onConfirm(borrowBook);
    };
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-black w-full justify-start">
                        <BookOpen /> Borrow
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Borrow Book</DialogTitle>
                        <DialogDescription>
                            Borrow a book by filling out the form below.
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
                                            <Input placeholder="Title" {...field} disabled />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Quantity Field */}
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Number of Copies"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = e.target.value ? Number(e.target.value) : 0;
                                                    field.onChange(value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Due Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a due date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>

                                                        date < new Date() || date < new Date("1900-01-01")
                                                    }
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Borrow</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default BorrowModal
