import storage from "../storage.js";

function getBook(request, h){

    if(!storage.has(request.params.bookId)){
        return fail(h, "Buku tidak ditemukan");
    }

    return success(h, request.params.bookId);
}

function success(h, bookId){
    const response = h.response({
        status: "success",
        data: {
            book: storage.get(bookId),
        }
    })
    return response;
}

function fail(h, message) {
    const response = h.response({
        status: "fail",
        message: message,
    });
    response.type("application/json");
    response.code(404);

    return response;
}

export default getBook;