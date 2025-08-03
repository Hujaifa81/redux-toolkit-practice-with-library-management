
# Minimal Library Management System 📚

## Project Overview
Develop a minimal library management system using React, Redux Toolkit and TypeScript. The system will allow users to view a list of books, perform CRUD operations, borrow books, and view a simple borrow summary—all without authentication, category filters, or payment integration.

The main goal is to build a functional and clean client-side application that interacts with a RESTful API, demonstrating proper state management, UI design, and core functionality.

---

## Features

### 1. Public Routes 🚀
All pages of this project are accessible without login or authentication. The focus is on essential book and borrowing features only.

### 2. Book Management 🛠️
- **Book List Table**: Show all books in a table format.
  - Columns: Title, Author, Genre, ISBN, Copies, Availability, and Actions.
- **Action Buttons/Icons**:
  - **Edit Book**: Opens a form with existing book data to edit book info. On submit, updates via API and reflects instantly in UI.
  - **Delete Book**: Opens a confirmation dialog before removal.
  - **Borrow Book**: Opens a simple form to borrow a book.
- **Add New Book**:
  - Button to open a form for creating a new book.
  - Fields: Title, Author, Genre, ISBN, Description, Copies, Available (optional, defaults to true).
  - After creation, redirect to book list and update UI immediately.

### 3. Borrow Book
- Open from “Borrow” button in the book list.
- **Fields**: Quantity (number), Due Date (date).
- **Business Logic**:
  - Quantity cannot exceed available copies.
  - If copies reaches 0, the book is marked unavailable.
- Submit via API and show success message.
- Redirect to borrow summary page.

### 4. Borrow Summary
- Displays a list of books that have been borrowed, along with the total quantity borrowed for each book.
- Retrieved from aggregation API.
- Columns: Book Title, ISBN, Total Quantity Borrowed.

---

## Landing Page Components

- **Navbar**: Simple navigation bar with links to:
  - All Books
  - Add Book
  - Borrow Summary
- **Book Table/List/Grid**: Display list of books with all core actions.
- **Footer**: Standard footer with site info or credits.

---

## Page List
(You may choose your preferred UI pattern—pages or modals—for these functionalities.)
- `/books` – Displays a list of all books with options to view, edit, delete, and borrow.
- `/create-book` – Form interface to add a new book to the system.
- `/books/:id` – Detailed view of a single book’s information.
- `/edit-book/:id` – Interface to update an existing book’s details.
- `/borrow/:bookId` – Form to borrow a selected book.
- `/borrow-summary` – Displays an aggregated summary of all borrowed books.

---
## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Redux Toolkit Query (RTK Query)**: Provides efficient data fetching and caching.
- **TypeScript**: For type safety and better development experience.
- **React Router**: For navigating between different pages.
- **Lucide Icons**: For UI icons.

---
## Repositories

- **Frontend Repository**: [Frontend Repo Link](https://github.com/Hujaifa81/redux-toolkit-practice-with-library-management)
- **Backend Repository**: [Backend Repo Link](https://github.com/Hujaifa81/library-management-api)

---

## Setup Instructions

### Clone the Repositories
- Clone the frontend repository:
  ```bash
  git clone https://github.com/Hujaifa81/redux-toolkit-practice-with-library-management
  ```
- Clone the backend repository:
  ```bash
  git clone https://github.com/Hujaifa81/library-management-api
  ```

---
## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Create a new pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).
