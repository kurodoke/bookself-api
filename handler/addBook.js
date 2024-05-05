import { nanoid } from "nanoid";
import storage from "../storage.js";

function addBook(request, h) {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    let id = nanoid(16);

    if(storage.has(id)){
        id = nanoid(16);
    }

    if (name === undefined) {
        return fail(h, "Gagal menambahkan buku. Mohon isi nama buku");
    } else if(readPage > pageCount){
        return fail(h, "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount");
    }
    
    const dateNow = new Date().toISOString();
    const data = {
        id,
        name: name,
        year: year,
        author: author,
        summary: summary,
        publisher: publisher,
        pageCount: pageCount,
        readPage: readPage,
        reading: reading,
        finished: pageCount === readPage ? true : false,
        insertedAt: dateNow,
        updatedAt: dateNow,
    };
    storage.set(id, data);

    return success(h, id);
}

function success(h, id) {
    const response = h.response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
            bookId: id,
        },
    });
    response.type("application/json");
    response.code(201);

    return response;
}

function fail(h, message) {
    const response = h.response({
        status: "fail",
        message: message,
    });
    response.type("application/json");
    response.code(400);

    return response;
}

export default addBook;
