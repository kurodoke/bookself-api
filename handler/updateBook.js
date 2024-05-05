import storage from "../storage.js";

function updateBook(request, h) {
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

    if (name === undefined) {
        return fail(h, "Gagal memperbarui buku. Mohon isi nama buku", 400);
    }

    if (readPage > pageCount) {
        return fail(
            h,
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
            400
        );
    }

    if (!storage.has(request.params.bookId)) {
        return fail(h, "Gagal memperbarui buku. Id tidak ditemukan", 404);
    }

    const dateNow = new Date().toISOString();

    const data = storage.get(request.params.bookId);

    const updatedData = {
        id: data.id,
        name: name,
        year: year,
        author: author,
        summary: summary,
        publisher: publisher,
        pageCount: pageCount,
        readPage: readPage,
        reading: reading,
        finished: pageCount === readPage ? true : false,
        insertedAt: data.insertedAt,
        updatedAt: dateNow,
    };

    storage.set(updatedData.id, updatedData);

    return success(h, request.params.bookId);
}

function success(h) {
    const response = h.response({
        status: "success",
        message: "Buku berhasil diperbarui",
    });
    return response;
}

function fail(h, message, statusCode) {
    const response = h.response({
        status: "fail",
        message: message,
    });
    response.type("application/json");
    response.code(statusCode);

    return response;
}

export default updateBook;
