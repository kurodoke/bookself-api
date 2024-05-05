import addBook from "./handler/addBook.js";
import deleteBook from "./handler/deleteBook.js";
import getAllBooks from "./handler/getAllBooks.js";
import getBook from "./handler/getBook.js";
import updateBook from "./handler/updateBook.js";

const routes = [
    {
        method: "GET",
        path: "/books",
        handler: getAllBooks
    },
    {
        method: "POST",
        path: "/books",
        handler: addBook
    },
    {
        method: "GET",
        path: "/books/{bookId}",
        handler: getBook,
    },
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: updateBook,
    },
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: deleteBook,
    },
];

export default routes;
